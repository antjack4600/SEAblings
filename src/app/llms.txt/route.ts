import { NextResponse } from "next/server";

export async function GET() {
  const text = `# SEAblings Only

> The community news feed of ASEAN — read the news of your country and the region, in 17
> languages, free to join. Read posts, write comments, share what matters.

## Pages

- [Landing](http://localhost:3101/): sign in or create an account.
- [Sign in](http://localhost:3101/sign-in): sign in with email (Firebase accounts).
- [Community feed](http://localhost:3101/feed): the community news feed of ASEAN.
- [Suggestions](http://localhost:3101/suggestions): suggest a topic, video, or event for the feed.
- [Profile](http://localhost:3101/profile): your public profile — country, language, bio, picture.
- [Settings](http://localhost:3101/settings): dark mode, language, password and account settings.
- [About](http://localhost:3101/about): what SEAblings Only is.
- [Contact](http://localhost:3101/contact): how to reach SEAblings Only.
- [Privacy policy](http://localhost:3101/privacy-policy): what SEAblings Only collects.

## API

- [Feed JSON](http://localhost:3101/api/feed): round-robin feed of posts.
- [Comments API](http://localhost:3101/api/comments): comments on posts (POST anonymous comments).
- [Profile API](http://localhost:3101/api/profile): account profile data.
- [Suggestions API](http://localhost:3101/api/suggestions): suggestion intake.

## Tech

Next.js 16, Firebase web SDK (email auth), better-sqlite3 (local SQLite).
`;
  return new NextResponse(text, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
