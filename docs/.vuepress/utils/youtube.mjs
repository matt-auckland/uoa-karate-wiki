const hosts = new Set([
  'youtube.com', 'www.youtube.com', 'm.youtube.com',
  'youtu.be', 'www.youtu.be',
  'youtube-nocookie.com', 'www.youtube-nocookie.com',
])

export function youtubeLinks(value) {
  if (typeof value !== 'string') return null

  try {
    const url = new URL(value.trim())
    if (!['http:', 'https:'].includes(url.protocol) || !hosts.has(url.hostname)) return null
    if (url.username || url.password || url.port) return null

    const parts = url.pathname.split('/').filter(Boolean)
    const shortHost = url.hostname === 'youtu.be' || url.hostname === 'www.youtu.be'
    let id
    if (shortHost && parts.length === 1) id = parts[0]
    else if (url.pathname === '/watch') id = url.searchParams.get('v')
    else if (parts.length === 2 && ['embed', 'shorts', 'live'].includes(parts[0])) id = parts[1]
    else if (parts.length === 1) id = parts[0]

    if (!/^[A-Za-z0-9_-]{11}$/.test(id ?? '')) return null

    return {
      embed: `https://www.youtube.com/embed/${id}`,
      watch: `https://www.youtube.com/watch?v=${id}`,
    }
  } catch {
    return null
  }
}
