import { NextResponse } from "next/server";
import { addSuggestion, getDb } from "@/lib/db";

export async function GET() {
  return NextResponse.json(
    getDb().prepare("SELECT * FROM suggestions ORDER BY id DESC LIMIT 50").all()
  );
}

export async function POST(req: Request) {
  const input = await req.json().catch(() => null);
  if (!input) return NextResponse.json({ error: "body required" }, { status: 400 });
  const id = addSuggestion({
    title: input.title,
    summary: input.summary,
    kind: input.kind,
    country_code: input.country_code,
    tags: input.tags,
  });
  return NextResponse.json({ id, ok: true }, { status: 201 });
}
