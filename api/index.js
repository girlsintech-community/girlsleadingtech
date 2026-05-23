import { Readable } from 'node:stream';
import server from '../dist/server/server.js';

// Disable Vercel's automatic body parser so we receive the raw stream
// This is essential for FormData and file uploads to work correctly in SSR
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  // Convert Vercel's Node.js request to a standard Web Request that TanStack Start expects
  const url = new URL(req.url, `https://${req.headers.host}`);
  
  let body = undefined;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    // Convert Node Readable stream to Web ReadableStream
    body = Readable.toWeb(req);
  }

  const webRequest = new Request(url.href, {
    method: req.method,
    headers: req.headers,
    body,
    duplex: 'half',
  });

  // Process the request through your SSR application
  const webResponse = await server.fetch(webRequest);

  // Send the response back to Vercel
  res.status(webResponse.status);
  webResponse.headers.forEach((value, key) => res.setHeader(key, value));
  
  if (webResponse.body) {
    const reader = webResponse.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
    res.end();
  } else {
    res.end();
  }
}
