import { handleChatRequest, parseRequestBody } from "../src/lib/chat-server.ts";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = await parseRequestBody(req);
  const result = await handleChatRequest(body);

  if (result.error) {
    return res.status(400).json(result);
  }

  return res.status(200).json(result);
}
