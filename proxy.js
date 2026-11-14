// Minimal OpenRouter proxy (no dependencies, Node 18+).
// Start: OPENROUTER_API_KEY=sk-or-... node proxy.js
// Proxy URL in the app: http://localhost:8787/api/v1  (API key field can stay empty)
const http = require('http');
const PORT = process.env.PORT || 8787;
const KEY = process.env.OPENROUTER_API_KEY || '';
const UPSTREAM = 'https://openrouter.ai';

http.createServer(async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOW_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Title, HTTP-Referer');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  if (req.method === 'OPTIONS') return res.writeHead(204).end();
  if (!req.url.startsWith('/api/v1/')) return res.writeHead(404).end('not found');

  const chunks = [];
  for await (const c of req) chunks.push(c);
  const auth = req.headers.authorization || (KEY && `Bearer ${KEY}`);
  try {
    const up = await fetch(UPSTREAM + req.url, {
      method: req.method,
      headers: { 'Content-Type': 'application/json', 'X-Title': 'Nearly', ...(auth ? { Authorization: auth } : {}) },
      body: req.method === 'GET' ? undefined : Buffer.concat(chunks)
    });
    res.writeHead(up.status, { 'Content-Type': up.headers.get('content-type') || 'application/json' });
    for await (const c of up.body) res.write(c);
    res.end();
  } catch (e) {
    res.writeHead(502).end(JSON.stringify({ error: { message: e.message } }));
  }
}).listen(PORT, () => console.log(`Proxy on http://localhost:${PORT}/api/v1`));
