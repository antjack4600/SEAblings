import { NextResponse } from "next/server";
import { getComments, addComment } from "@/lib/db";

export async function GET(req: Request) {
  const postId = Number(new URL(req.url).searchParams.get("postId"));
  if (!postId) return NextResponse.json({ error: "postId required" }, { status: 400 });
  return NextResponse.json(getComments(postId));
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.body !== "string" || !body.body.trim()) {
    return NextResponse.json({ error: "body required" }, { status: 400 });
  }
  const comment = addComment(Number(body.postId), body.userId ?? null, body.body);
  return NextResponse.json(comment, { status: 201 });
}
