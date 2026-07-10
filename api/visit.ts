// api/visit.js
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  const ip =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  if (req.method === "POST") {
    const now = new Date().toISOString();
    await redis.hset("visits", { [ip]: now });
    return res.status(200).json({ ok: true });
  }

  if (req.method === "GET") {
    const all = await redis.hgetall("visits");
    const list = Object.entries(all || {}).map(([ip, lastSeen]) => ({
      ip,
      lastSeen,
    }));
    list.sort((a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime());
    return res.status(200).json({ count: list.length, visits: list });
  }

  res.status(405).end();
}