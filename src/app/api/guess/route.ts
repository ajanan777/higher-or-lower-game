import { shows } from "../../data/shows";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { leftID, rightID, chosenID, score, highScore } = body;
  const clientId = process.env.MAL_CLIENT_ID;

  if (
    typeof leftID != "number" ||
    typeof rightID != "number" ||
    typeof chosenID != "number"
  ) {
    return new Response("Invalid input", { status: 400 });
  }
  if (chosenID !== leftID && chosenID !== rightID) {
    return new Response("chosenID does not match options", { status: 400 });
  }

  //   const left = shows.find((show) => show.id === leftID);
  //   const right = shows.find((show) => show.id === rightID);

  if (!clientId) {
    return NextResponse.json(
      { error: "MAL_CLIENT_ID is not set" },
      { status: 500 }
    );
  }

  const leftResponse = await fetch(
    `https://api.myanimelist.net/v2/anime/${leftID}?fields=mean`,
    {
      headers: { "X-MAL-CLIENT-ID": clientId },
      cache: "no-store",
    }
  );

  const left = await leftResponse.json();

  const rightResponse = await fetch(
    `https://api.myanimelist.net/v2/anime/${rightID}?fields=mean`,
    {
      headers: { "X-MAL-CLIENT-ID": clientId },
      cache: "no-store",
    }
  );

  const right = await rightResponse.json();

  if (!(left && right)) {
    return new Response("chosenID does not match options", { status: 400 });
  }
  var outcome = null;
  let chosenRating;
  const leftRating = left.mean;
  const rightRating = right.mean;
  if (chosenID === leftID) {
    chosenRating = leftRating;
  } else {
    chosenRating = rightRating;
  }
  //Score calculations + outcome determination
  let newScore = score;
  let newHighScore = highScore;
  if (Math.max(leftRating, rightRating) === chosenRating) {
    outcome = true; //win
    newScore = score + 1;
    newHighScore = Math.max(newHighScore, newScore);
  } else {
    outcome = false; //lose
    newHighScore = Math.max(newHighScore, newScore);
    newScore = 0;
  }

  return Response.json(
    {
      leftRating: leftRating,
      rightRating: rightRating,
      outcome: outcome,
      chosenRating: chosenRating,
      newScore: newScore,
      newHighScore: newHighScore,
    },
    { status: 200 }
  );
}

// const winRating = Math.max(leftRating, rightRating)
