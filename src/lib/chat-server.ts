import { scholarships } from "../data/scholarships";
import { realEvents } from "../data/events-real";
import { initiatives } from "../data/initiatives";
import {
  books,
  communities,
  programs,
  roadmaps,
  interviewPrep,
  certifications,
  articles,
  videos
} from "../data/resources";
import { curatedRoadmaps, girlsInTechResources } from "../data/curated-resources";

interface ChatRequestBody {
  query?: string;
}

interface ChatResult {
  query?: string;
  text?: string;
  results?: Array<Record<string, unknown>>;
  totalResults?: number;
  page?: number;
  pageSize?: number;
  totalPages?: number;
  error?: string;
}

function matchCuratedResource(query: string): string | null {
  const norm = query.toLowerCase().trim();

  // Helper to check word/phrase match
  const match = (keywords: string[]) => keywords.some(kw => norm.includes(kw));

  // 1. DSA
  if (match(["dsa", "data structure", "algorithm", "leet-code", "leetcode"])) {
    return formatRoadmap(curatedRoadmaps.dsa);
  }
  // 2. Java
  if (match(["java"]) && !norm.includes("javascript")) {
    return formatRoadmap(curatedRoadmaps.java);
  }
  // 3. Frontend
  if (match(["frontend", "front-end", "html", "css", "javascript", "react", "tailwind", "ui library", "material-ui", "material ui"])) {
    return formatRoadmap(curatedRoadmaps.frontend);
  }
  // 4. Backend
  if (match(["backend", "back-end", "node.js", "node", "express", "rest api", "database", "sql", "nosql", "auth"])) {
    return formatRoadmap(curatedRoadmaps.backend);
  }
  // 5. Python
  if (match(["python"])) {
    return formatRoadmap(curatedRoadmaps.python);
  }
  // 6. Machine Learning
  if (match(["machine learning", " ml ", " ml", "ml ", "deep learning", "ai ", " ai", "artificial intelligence", "pytorch", "tensorflow", "model training"])) {
    return formatRoadmap(curatedRoadmaps.ml);
  }
  // 7. IoT
  if (match(["iot", "internet of things", "esp32", "sensor", "microcontroller", "arduino"])) {
    return formatRoadmap(curatedRoadmaps.iot);
  }
  // 8. Version Control
  if (match(["git", "github", "version control", "branch", "pull request", "open source contribution"])) {
    return formatRoadmap(curatedRoadmaps.git);
  }
  // 9. Cloud & Deployment
  if (match(["cloud", "deploy", "docker", "ci/cd", "vercel", "netlify", "aws", "azure", "gcp"])) {
    return formatRoadmap(curatedRoadmaps.cloud);
  }
  // 10. Girls in Tech
  if (match(["girl", "woman", "women", "female", "gender", "sister", "diversity"])) {
    return formatGirlsResources();
  }

  return null;
}

function formatRoadmap(roadmap: any): string {
  let text = `[Roadmap] ${roadmap.title}\n\n`;
  text += `Here is a step-by-step path to master this topic:\n`;
  roadmap.steps.forEach((step: string, index: number) => {
    text += `${index + 1}. ${step}\n`;
  });
  
  text += `\nRecommended Resources:\n`;
  roadmap.links.forEach((link: any) => {
    text += `- ${link.name}: ${link.url}\n`;
  });

  text += `\nKeep exploring - opportunities are waiting for you!`;
  
  return text.replace(/—/g, "-");
}

function formatGirlsResources(): string {
  let text = `[Community] Girls & Tech Student Resources\n\n`;
  text += `Here are some amazing programs, scholarships, and communities curated for girls and tech students:\n\n`;
  girlsInTechResources.forEach((res, index) => {
    text += `${index + 1}. [${res.category}] ${res.title} - ${res.description} (Link: ${res.link})\n\n`;
  });

  text += `Keep exploring - opportunities are waiting for you!`;
  
  return text.replace(/—/g, "-");
}

function searchAll(query: string) {
  const norm = query.toLowerCase().trim();
  const results: { category: string; title: string; description: string; link?: string }[] = [];

  const matchAndAdd = (items: any[], category: string, getFields: (item: any) => { title: string; desc: string; link?: string }) => {
    if (!items) return;
    for (const item of items) {
      const fields = getFields(item);
      const textToSearch = `${fields.title} ${fields.desc}`.toLowerCase();
      if (textToSearch.includes(norm)) {
        results.push({
          category,
          title: fields.title,
          description: fields.desc,
          link: fields.link
        });
      }
    }
  };

  // 1. Scholarships
  matchAndAdd(scholarships, "Scholarship", (s) => ({
    title: s.title,
    desc: `${s.provider || ""} | Benefit: ${s.benefit || ""} | Eligibility: ${s.eligibility || ""} | Open Date: ${s.openDate || ""}`,
    link: s.link
  }));

  // 2. Events
  matchAndAdd(realEvents, "Event", (e) => ({
    title: e.title,
    desc: `${e.summary || ""} Speaker: ${e.speakerName || ""} (${e.speakerDesignation || ""} at ${e.speakerCompany || ""})`,
    link: e.youtubeLink || e.registrationLink
  }));

  // 3. Initiatives
  matchAndAdd(initiatives, "Mentorship", (i) => ({
    title: i.name,
    desc: `${i.tagline || ""} - ${i.description || ""}`,
    link: i.url
  }));

  // 4. Resources
  matchAndAdd(books, "Resource", (b) => ({
    title: b.title,
    desc: `${b.author ? `By ${b.author} | ` : ""}${b.description || ""}`,
    link: b.link
  }));

  matchAndAdd(communities, "Community", (c) => ({
    title: c.title,
    desc: c.description || "",
    link: c.link
  }));

  matchAndAdd(programs, "Program", (p) => ({
    title: p.title,
    desc: `${p.author ? `By ${p.author} | ` : ""}${p.description || ""}`,
    link: p.link
  }));

  matchAndAdd(roadmaps, "Roadmap", (r) => ({
    title: r.title,
    desc: r.description || "",
    link: r.link
  }));

  matchAndAdd(interviewPrep, "Resource", (ip) => ({
    title: ip.title,
    desc: ip.description || "",
    link: ip.link
  }));

  matchAndAdd(certifications, "Resource", (c) => ({
    title: c.title,
    desc: c.description || "",
    link: c.link
  }));

  matchAndAdd(articles, "Resource", (a) => ({
    title: a.title,
    desc: `${a.author ? `By ${a.author} | ` : ""}${a.description || ""}`,
    link: a.link
  }));

  matchAndAdd(videos, "Resource", (v) => ({
    title: v.title,
    desc: v.description || "",
    link: v.link
  }));

  return results;
}

function formatResultsResponse(results: any[], query: string) {
  if (results.length === 0) {
    return `Sorry, I couldn’t find anything right now. Try asking about Scholarships, Events, or Mentorship.`;
  }

  const topResults = results.slice(0, 5);
  let text = `Here are the top ${topResults.length} matches I found for "${query}":\n\n`;

  topResults.forEach((res, index) => {
    let desc = res.description || "";
    desc = desc.replace(/—/g, "-");

    const sentences = desc.split(/(?<=[.!?])\s+/);
    const shortDesc = sentences.slice(0, 3).join(" ");

    const linkStr = res.link ? ` (Link: ${res.link})` : "";
    text += `${index + 1}. [${res.category}] ${res.title} - ${shortDesc}${linkStr}\n\n`;
  });

  text += `Keep exploring - opportunities are waiting for you!`;
  return text.replace(/—/g, "-");
}

export async function handleChatRequest(body: ChatRequestBody): Promise<ChatResult> {
  const cleanedQuery = (body.query || "").toString().trim();
  if (!cleanedQuery) {
    return {
      error: "Query is required."
    };
  }

  // 1. Check curated resources first (DSA, Java, Python, Frontend, Backend, ML, IoT, Cloud, Git, Girls in tech)
  const curatedMatchText = matchCuratedResource(cleanedQuery);
  if (curatedMatchText) {
    return {
      query: cleanedQuery,
      text: curatedMatchText,
      results: [],
      totalResults: 1,
      page: 1,
      pageSize: 5,
      totalPages: 1
    };
  }

  // 2. Regular local dataset search
  const matches = searchAll(cleanedQuery);
  const formattedResponseText = formatResultsResponse(matches, cleanedQuery);

  return {
    query: cleanedQuery,
    text: formattedResponseText,
    results: [],
    totalResults: matches.length,
    page: 1,
    pageSize: 5,
    totalPages: matches.length > 0 ? 1 : 0
  };
}

export async function parseRequestBody(req: any) {
  if (req.body) {
    return req.body;
  }

  let body = "";
  for await (const chunk of req) {
    body += chunk;
  }

  if (!body) {
    return {};
  }

  try {
    return JSON.parse(body);
  } catch {
    return {};
  }
}
