import { NextResponse } from "next/server";

export async function GET() {
  const indexFirst = Math.floor(Math.random() * 500) + 1;
  let indexSecond;
  do {
    indexSecond = Math.floor(Math.random() * 500) + 1;
  } while (indexSecond === indexFirst);

  const clientId = process.env.MAL_CLIENT_ID;

  if (!clientId) {
    return NextResponse.json(
      { error: "MAL_CLIENT_ID is not set" },
      { status: 500 }
    );
  }

  const first = await fetch(
    `https://api.myanimelist.net/v2/anime/ranking?ranking_type=all&limit=${indexFirst}`,
    {
      headers: { "X-MAL-CLIENT-ID": clientId },
      cache: "no-store", // avoid caching while you iterate
    }
  );

  const second = await fetch(
    `https://api.myanimelist.net/v2/anime/ranking?ranking_type=all&limit=${indexSecond}`,
    {
      headers: { "X-MAL-CLIENT-ID": clientId },
      cache: "no-store", // avoid caching while you iterate
    }
  );

  const dataFirst = await first.json();
  const dataSecond = await second.json();
  const selectedAnimeFirst = dataFirst.data[dataFirst.data.length - 1];
  const selectedAnimeSecond = dataSecond.data[dataSecond.data.length - 1];

  const pairShows = [selectedAnimeFirst, selectedAnimeSecond];
  //   return NextResponse.json(selectedAnime, { status: r.status });

  const cleanedPair = pairShows.map(
    ({
      node: {
        id,
        title,
        main_picture: { large },
      },
    }) => ({
      id,
      name: title,
      imageUrl: large,
    })
  );

  //   const filteredPair = pairShows.map(({ id, name, imageUrl }) => ({
  //     id,
  //     name,
  //     imageUrl,
  //   }));

  return NextResponse.json({
    first: cleanedPair[0],
    second: cleanedPair[1],
  });
}
