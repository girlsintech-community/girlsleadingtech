// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { handleChatRequest, parseRequestBody } from "./src/lib/chat-server.ts";
import type { ViteDevServer } from "vite";
import type { IncomingMessage, ServerResponse } from "http";

function chatApiDevPlugin() {
  return {
    name: "chat-api-dev",
    configureServer(server: ViteDevServer) {
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: (err?: any) => void) => {
        if (req.method !== "POST" || !req.url?.startsWith("/api/chat")) {
          return next();
        }

        try {
          const body = await parseRequestBody(req);
          const result = await handleChatRequest(body);
          res.writeHead(result.error ? 400 : 200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(result));
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: message || "Internal server error" }));
        }
      });
    },
  };
}

export default defineConfig({
  cloudflare: false, // Disables Cloudflare Worker generation
  tanstackStart: {
    server: {
      preset: "vercel", // Nitro build for Vercel Serverless Functions
    },
    spa: {}, // Enable SPA mode for static shell
  },
  vite: {
    plugins: [chatApiDevPlugin()],
  },
});
