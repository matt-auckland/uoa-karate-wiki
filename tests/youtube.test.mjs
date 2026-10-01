import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import test from 'node:test'
import { youtubeLinks } from '../docs/.vuepress/utils/youtube.mjs'

test('supports existing YouTube URL formats and query parameter order', () => {
  const id = 'YtcRO7zceIg'
  for (const url of [
    `https://youtu.be/${id}?si=share-token`,
    `https://www.youtu.be/${id}`,
    `https://www.youtube.com/watch?feature=shared&v=${id}`,
    `https://m.youtube.com/watch?v=${id}`,
    `http://youtube.com/embed/${id}`,
    `https://www.youtube-nocookie.com/embed/${id}`,
    `https://youtube.com/${id}`,
    `https://www.youtube.com/shorts/${id}`,
    `https://www.youtube.com/live/${id}`,
  ]) {
    assert.deepEqual(youtubeLinks(url), {
      embed: `https://www.youtube.com/embed/${id}`,
      watch: `https://www.youtube.com/watch?v=${id}`,
    })
  }
})

test('rejects malformed links and non-YouTube destinations', () => {
  for (const url of [
    undefined, '', 'https\n//www.youtube.com/watch?v=gvVyBNzfHiY',
    '/watch?v=YtcRO7zceIg', 'javascript:alert(1)',
    'https://youtube.com.evil.example/watch?v=YtcRO7zceIg',
    'https://notyoutube.com/watch?v=YtcRO7zceIg',
    'https://youtube.com/watch?v=short',
    'https://youtube.com/watch?v=YtcRO7zceIgEXTRA',
    'https://youtube.com/embed/YtcRO7zceIg/extra',
    'https://user:password@youtube.com/watch?v=YtcRO7zceIg',
  ]) assert.equal(youtubeLinks(url), null, String(url))
})

test('every YouTube embed in the wiki has a valid URL', async () => {
  async function checkDirectory(directory) {
    let count = 0
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = `${directory}/${entry.name}`
      if (entry.name.startsWith('.')) continue
      if (entry.isDirectory()) count += await checkDirectory(path)
      else if (entry.name.endsWith('.md')) {
        const content = await readFile(path, 'utf8')
        for (const match of content.matchAll(/<Wiki-Video\b[^>]*ytUrl="([^"]+)"[^>]*>/g)) {
          assert.ok(youtubeLinks(match[1]), `${path}: ${match[1]}`)
          count++
        }
      }
    }
    return count
  }
  assert.ok(await checkDirectory(new URL('../docs', import.meta.url).pathname) > 0)
})
