// src/app/api/mal/search/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const anime_id = Math.floor(Math.random() * 500) + 1;
  const clientId = process.env.MAL_CLIENT_ID;

  if (!clientId) {
    return NextResponse.json(
      { error: "MAL_CLIENT_ID is not set" },
      { status: 500 }
    );
  }

  const r = await fetch(
    `https://api.myanimelist.net/v2/anime/${anime_id}?fields=mean`,
    {
      headers: { "X-MAL-CLIENT-ID": clientId },
      cache: "no-store", // avoid caching while you iterate
    }
  );

  const data = await r.json();
  // const selectedAnime = data.data[data.data.length - 1];
  return NextResponse.json(data, { status: r.status });
}
