import { NextResponse } from "next/server";
type Mode = "easy" | "medium" | "hard";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get("mode") ?? "easy";

  type Mode = "easy" | "medium" | "hard";
  const mode: Mode = (["easy", "medium", "hard"] as const).includes(raw as Mode)
    ? (raw as Mode)
    : "easy";

  let range;
  if (mode === "easy") {
    range = 100;
  } else if (mode === "medium") {
    range = 200;
  } else {
    range = 500;
  }

  const indexFirst = Math.floor(Math.random() * range) + 1;
  let indexSecond;
  do {
    indexSecond = Math.floor(Math.random() * range) + 1;
  } while (indexSecond === indexFirst);

  const clientId = process.env.MAL_CLIENT_ID;

  if (!clientId) {
    return NextResponse.json(
      { error: "MAL_CLIENT_ID is not set" },
      { status: 500 }
    );
  }

  let higherIndex;
  if (indexFirst > indexSecond) {
    higherIndex = indexFirst;
  } else {
    higherIndex = indexSecond;
  }

  console.log(higherIndex);
  const dataSet = await fetch(
    `https://api.myanimelist.net/v2/anime/ranking?ranking_type=all&limit=${higherIndex}`,
    {
      headers: { "X-MAL-CLIENT-ID": clientId },
      cache: "no-store", // avoid caching while you iterate
    }
  );
  const theResponse = await dataSet.json();

  const selectedAnimeFirst = theResponse.data[indexFirst - 1];
  console.log(selectedAnimeFirst);

  const selectedAnimeSecond = theResponse.data[indexSecond - 1];
  console.log(selectedAnimeSecond);

  const pairShows = [selectedAnimeFirst, selectedAnimeSecond];

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

  const filteredPair = pairShows.map(({ id, name, imageUrl }) => ({
    id,
    name,
    imageUrl,
  }));

  return NextResponse.json({
    first: cleanedPair[0],
    second: cleanedPair[1],
  });
}
