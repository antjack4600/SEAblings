// Shared types for SEAblings Word (southeastasiaanthony — ASEAN News Feed App)
export interface Post {
  id: number;
  language_code: string;
  country_code: string;
  kind: "text" | "video"; // future: "ad"
  title: string | null;
  body: string | null;
  media_url: string | null;
  summary: string | null;
  created_at: string;
}

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface Comment {
  id: number;
  post_id: number;
  user_id: string | null;
  body: string;
  created_at: string;
}

export interface Suggestion {
  id: number;
  title: string | null;
  summary: string | null;
  kind: "topic" | "video" | "event";
  country_code: string | null;
  tags: string | null;
  status: string;
  created_at: string;
}
