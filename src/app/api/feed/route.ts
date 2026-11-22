import { NextResponse } from "next/server";
import { roundRobinFeed } from "@/lib/equalCoverage";

export async function GET() {
  const posts = roundRobinFeed(30);
  return NextResponse.json(posts);
}
