import { NextResponse } from "next/server";
import { getComments, addComment } from "@/lib/db";

function parsePostId(v: string | null): number {
  const n = Number(v);
  return Number.isInteger(n) && n > 0 ? n : 0;
}

export async function GET(req: Request) {
  const postId = parsePostId(new URL(req.url).searchParams.get("postId"));
  if (!postId) return NextResponse.json({ error: "postId required" }, { status: 400 });
  return NextResponse.json(getComments(postId));
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.body !== "string" || !body.body.trim()) {
    return NextResponse.json({ error: "body required" }, { status: 400 });
  }
  const postId = Number(body.postId);
  if (!Number.isInteger(postId) || postId <= 0) {
    return NextResponse.json({ error: "postId required" }, { status: 400 });
  }
  // Comments are anonymous community content; userId is client-asserted (see profile route).
  const userId = typeof body.userId === "string" && body.userId.trim() !== "" ? body.userId.trim() : null;
  const comment = addComment(postId, userId, body.body);
  return NextResponse.json(comment, { status: 201 });
}
