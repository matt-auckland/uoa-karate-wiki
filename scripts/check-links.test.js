import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createServer } from 'node:http';
import { spawnSync } from 'node:child_process';
import { checkSite, checkExternal } from './check-links.js';

test('checks rendered navigation, decoded fragments, directory routes and files; rejects missing targets', async t => {
  const root = await mkdtemp(join(tmpdir(), 'wiki-links-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, 'kata'));
  await writeFile(join(root, 'kata/index.html'), '<h2 id="名前">Name</h2><a name="legacy"></a>');
  await writeFile(join(root, 'image.png'), 'fixture');
  await writeFile(join(root, 'index.html'), '<nav><a href="/kata/#%E5%90%8D%E5%89%8D">Kata</a></nav><a href="/kata/?a=1#legacy">Legacy</a><a href="/image.png">Image</a><a href="/missing">Missing</a><a href="/kata/#missing">Missing heading</a><a href="https://example.com/?a=1&amp;b=2">External</a><a href="mailto:test@example.com">Email</a>');
  const result = await checkSite(root);
  assert.equal(result.checked, 5);
  assert.deepEqual(result.failures.map(f => f.reason), ['Missing page or file', 'Missing section']);
  assert.equal(result.external[0].url, 'https://example.com/?a=1&b=2');
  assert.equal(spawnSync(process.execPath, ['scripts/check-links.js', '--dir=' + root]).status, 1);
  await writeFile(join(root, 'index.html'), '<a href="/kata/#legacy">Good</a>');
  assert.equal(spawnSync(process.execPath, ['scripts/check-links.js', '--dir=' + root]).status, 0);
});

test('fails clearly when the build is missing', async () => {
  await assert.rejects(checkSite('does-not-exist'));
});

test('distinguishes successful redirects, not-found pages, access blocks, maintenance and timeouts', async t => {
  let maintenanceRequests = 0;
  const server = createServer((req, res) => {
    if (req.url === '/redirect') { res.writeHead(302, { Location: '/ok' }); res.end(); }
    else if (req.url === '/maintenance') { maintenanceRequests++; res.writeHead(503); res.end('メンテナンス 一時停止'); }
    else if (req.url === '/blocked') { res.writeHead(403); res.end('Forbidden'); }
    else if (req.url === '/missing') { res.writeHead(404); res.end(); }
    else if (req.url === '/slow') { /* Wait for client timeout. */ }
    else res.end('OK');
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => { server.closeAllConnections(); server.close(); });
  const base = 'http://127.0.0.1:' + server.address().port;
  assert.equal((await checkExternal(base + '/redirect')).result, 'valid');
  assert.equal((await checkExternal(base + '/missing')).result, 'broken');
  assert.equal((await checkExternal(base + '/blocked')).result, 'unavailable');
  assert.match((await checkExternal(base + '/maintenance')).reason, /maintenance/);
  assert.equal(maintenanceRequests, 2);
  assert.equal((await checkExternal(base + '/slow', 30)).result, 'unavailable');
});
