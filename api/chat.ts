import { handleChatRequest, parseRequestBody } from "../src/lib/chat-server";

export default async function handler(
  req: { method?: string; body?: { query?: string }; on?: (event: string, listener: (chunk: Buffer) => void) => void },
  res: {
    setHeader: (name: string, value: string) => void;
    status: (code: number) => { json: (body: unknown) => void };
  },
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = await parseRequestBody(req);
    const result = await handleChatRequest(body);

    if (result.error) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return res.status(500).json({ error: message });
  }
}
