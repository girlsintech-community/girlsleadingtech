import { speakers } from "@/data/community";

export function youtubeId(url?: string): string | null {
  if (!url) return null;
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
  return m ? m[1] : null;
}

export function youtubeThumb(url?: string): string | null {
  const id = youtubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}

const norm = (s: string) =>
  s.toLowerCase().replace(/^dr\.?\s+/, "").replace(/[^a-z0-9]+/g, " ").trim();

const speakerByName = new Map<string, (typeof speakers)[number]>();
for (const s of speakers) speakerByName.set(norm(s.name), s);

export function getSpeakerImageByName(name?: string): string | undefined {
  if (!name) return undefined;
  const exact = speakerByName.get(norm(name));
  if (exact?.image) return exact.image;
  // Fuzzy: match by first two name tokens
  const key = norm(name).split(" ").slice(0, 2).join(" ");
  for (const [k, s] of speakerByName) {
    if (s.image && (k.startsWith(key) || key.startsWith(k.split(" ").slice(0, 2).join(" ")))) {
      return s.image;
    }
  }
  return undefined;
}
