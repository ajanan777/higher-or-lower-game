"use client";
import { useState } from "react";
import { useEffect } from "react";
import ItemCard from "../components/ItemCard";
import { Item, Pair, GuessResponse, RevealState } from "../data/types";

export default function Game() {
  // delay helper function
  const sleep = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));

  const [pair, setPair] = useState<Pair | null>(null);
  const [isGuessing, setIsGuessing] = useState(false);
  const [reveal, setReveal] = useState<RevealState | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const fetchPair = async () => {
    const response = await fetch("/api/pair");
    const data = await response.json();
    setPair(data);
    setReveal(null);
  };

  useEffect(() => {
    fetchPair();
  }, []);

  const handleClick = async (chosenItem: Item, otherItem: Item) => {
    if (!pair || isGuessing || reveal) {
      console.log(isGuessing);
      return;
    }
    setIsGuessing(true);
    await sleep(300);
    try {
      const response = await fetch("/api/guess", {
        method: "POST", //HTTP method
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leftID: pair.first.id,
          rightID: pair.second.id,
          chosenID: chosenItem.id,
          score: score,
          highScore: highScore,
        }),
      });
      const data = await response.json();
      outcomeReveal(data, chosenItem);
    } finally {
      console.log("guess complete");
      setIsGuessing(false);
    }
  };

  const outcomeReveal = async (data: GuessResponse, chosenItem: Item) => {
    const {
      chosenRating,
      leftRating,
      outcome,
      rightRating,
      newHighScore,
      newScore,
    } = data;
    console.log("outcome", chosenRating);

    setReveal({
      chosenId: chosenItem.id,
      outcome,
      leftRating,
      rightRating,
    });

    console.log(newScore);

    setHighScore(newHighScore);
    setScore(newScore);

    //update score number
    //get new pair cards
    await sleep(1200);
    if (outcome === false) {
      await sleep(500);
    }
    if (outcome === true) {
    }
    console.log("animation complete");
    fetchPair();
  };

  return (
    <div>
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center select-none">
        <h1 className="text-8xl text-[#7df9ff] font-extrabold drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] animate-pulse [animation-duration:5s]">
          {score}
        </h1>
        <h1
          className={`" font-extrabold drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]" ${
            highScore === 0 || highScore > score
              ? "text-[#ff71ce] "
              : "text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-400  [text-shadow:0_0_5px_#e879f9,0_0_14px_#22d3ee] [-webkit-text-stroke:1px_#22d3ee] animate-pulse [animation-duration:2s]"
          } `}
        >
          HIGH SCORE: {highScore}
        </h1>
      </div>

      {pair && (
        <div className="flex pt-20 flex-row items-center justify-center min-h-screen gap-20 select-none">
          <div className={!isGuessing && !reveal ? "cursor-pointer" : ""}>
            <ItemCard
              item={pair.first}
              onClick={() => handleClick(pair.first, pair.second)}
              disabled={isGuessing || reveal?.chosenId === pair.second.id}
              highlight={
                reveal && reveal.chosenId === pair.first.id
                  ? reveal.outcome
                    ? "correct"
                    : "wrong"
                  : undefined
              }
              rating={reveal?.leftRating}
            />
          </div>
          <div className={!isGuessing && !reveal ? "cursor-pointer" : ""}>
            <ItemCard
              item={pair.second}
              onClick={() => handleClick(pair.second, pair.first)}
              disabled={isGuessing || reveal?.chosenId === pair.first.id}
              highlight={
                reveal && reveal.chosenId === pair.second.id
                  ? reveal.outcome
                    ? "correct"
                    : "wrong"
                  : undefined
              }
              rating={reveal?.rightRating}
            />
          </div>
        </div>
      )}
    </div>
  );
}
