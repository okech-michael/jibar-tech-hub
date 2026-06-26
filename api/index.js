import { fileURLToPath, URL } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const serverPath = new URL('../dist/server/server.js', import.meta.url).pathname;

export default async function handler(req, res) {
  const host = req.headers.host ?? 'localhost';
  const protocol = req.headers['x-forwarded-proto'] ?? 'https';
  const url = new URL(req.url ?? '/', `${protocol}://${host}`);

  const requestInit = {
    method: req.method,
    headers: req.headers,
    body: req.method !== 'GET' && req.method !== 'HEAD' ? req : undefined,
  };

  const request = new Request(url.toString(), requestInit);

  const { default: server } = await import(serverPath);
  const response = await server.fetch(request, {}, {});

  res.statusCode = response.status;
  response.headers.forEach((value, name) => {
    if (name.toLowerCase() === 'transfer-encoding') return;
    res.setHeader(name, value);
  });

  const body = await response.arrayBuffer();
  res.end(Buffer.from(body));
}
