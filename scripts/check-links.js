import { load } from 'cheerio';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve, relative, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

const ORIGIN = 'https://wiki.uoa-karate.club';
async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map(e => e.isDirectory() ? files(resolve(dir, e.name)) : resolve(dir, e.name)))).flat();
}
export async function checkSite(directory, origin = ORIGIN) {
  const root = resolve(directory);
  const all = await files(root);
  const existing = new Set(all.map(f => '/' + relative(root, f).split(sep).join('/')));
  const pages = new Map();
  for (const file of all.filter(f => f.endsWith('.html'))) {
    const $ = load(await readFile(file, 'utf8'));
    pages.set('/' + relative(root, file).split(sep).join('/'), { $, ids: new Set($('[id], a[name]').toArray().map(e => $(e).attr('id') ?? $(e).attr('name'))) });
  }
  if (!pages.size) throw new Error(`No built HTML pages in ${root}. Run npm run build first.`);
  const failures = [], external = new Map();
  let checked = 0;
  for (const [source, { $ }] of pages) {
    for (const element of $('a[href], iframe[src]').toArray()) {
      const raw = $(element).attr(element.name === 'iframe' ? 'src' : 'href');
      let url;
      try { url = new URL(raw, origin + source); } catch { failures.push({ source, target: raw, reason: 'Malformed URL' }); continue; }
      if (!['http:', 'https:'].includes(url.protocol)) continue;
      if (url.origin !== new URL(origin).origin) {
        url.hash = '';
        const refs = external.get(url.href) ?? new Set(); refs.add(source); external.set(url.href, refs);
        continue;
      }
      checked++;
      let target, fragment;
      try { target = decodeURIComponent(url.pathname); fragment = decodeURIComponent(url.hash.slice(1)); }
      catch { failures.push({ source, target: raw, reason: 'Malformed URL encoding' }); continue; }
      const candidates = [target, target.endsWith('/') ? target + 'index.html' : target + '.html', target + '/index.html'];
      const found = candidates.find(f => existing.has(f));
      if (!found) failures.push({ source, target: raw, reason: 'Missing page or file' });
      else if (fragment && pages.has(found) && !pages.get(found).ids.has(fragment)) failures.push({ source, target: raw, reason: 'Missing section' });
    }
  }
  return { pages: pages.size, checked, failures, external: [...external].map(([url, sources]) => ({ url, sources: [...sources] })) };
}
export async function checkExternal(url, timeout = 15000) {
  let endpoint = url;
  const parsed = new URL(url);
  const videoId = /(?:^|\.)youtube\.com$/.test(parsed.hostname) ? (parsed.pathname.startsWith('/embed/') ? parsed.pathname.split('/')[2] : parsed.searchParams.get('v')) : parsed.hostname === 'youtu.be' ? parsed.pathname.slice(1) : null;
  if (videoId) endpoint = 'https://www.youtube.com/oembed?format=json&url=' + encodeURIComponent('https://www.youtube.com/watch?v=' + videoId);
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await fetch(endpoint, { redirect: 'follow', signal: AbortSignal.timeout(timeout), headers: { 'User-Agent': 'Mozilla/5.0 (compatible; UoAKarateLinkChecker/1.0)' } });
      const status = response.status;
      if ([429, 502, 503, 504].includes(status) && !attempt) { await response.body?.cancel(); continue; }
      if (status === 404 || status === 410) { await response.body?.cancel(); return { url, status, result: 'broken', reason: videoId ? 'Video metadata unavailable (removed, private, or restricted); review playback' : 'Not found' }; }
      if (!response.ok) {
        const body = (await response.text()).slice(0, 100000);
        return { url, status, result: 'unavailable', reason: body.includes('メンテナンス') && body.includes('一時停止') ? 'Site temporarily suspended for maintenance' : 'Access denied, rate limited, or server error' };
      }
      await response.body?.cancel();
      return { url, status, result: 'valid', reason: response.url.includes('github.com/login') ? 'Sign-in required to edit' : 'Reachable' };
    } catch (error) {
      if (attempt) return { url, result: 'unavailable', reason: error.message };
    }
  }
}
async function main() {
  const args = process.argv.slice(2);
  const directory = args.find(a => a.startsWith('--dir='))?.slice(6) ?? 'docs/.vuepress/dist';
  const report = await checkSite(directory);
  for (const issue of report.failures) console.error(`${issue.source}: ${issue.target} — ${issue.reason}`);
  console.log(`Checked ${report.checked} internal links across ${report.pages} HTML pages; ${report.failures.length} failures.`);
  report.externalResults = [];
  if (args.includes('--external')) {
    const queue = [...report.external];
    await Promise.all(Array.from({ length: 4 }, async () => {
      while (queue.length) {
        const item = queue.shift();
        const result = { ...await checkExternal(item.url), sources: item.sources };
        report.externalResults.push(result);
        if (result.result !== 'valid') console.error(`${result.result}: ${result.url} — ${result.status ?? ''} ${result.reason}`);
      }
    }));
    const counts = report.externalResults.reduce((a, r) => (a[r.result] = (a[r.result] ?? 0) + 1, a), {});
    console.log('External results:', counts);
  }
  const output = args.find(a => a.startsWith('--json='))?.slice(7);
  if (output) await writeFile(output, JSON.stringify(report, null, 2) + '\n');
  process.exitCode = report.failures.length || report.externalResults.some(r => r.result === 'broken') ? 1 : report.externalResults.some(r => r.result === 'unavailable') ? 2 : 0;
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) main().catch(error => { console.error(error.message); process.exitCode = 1; });
