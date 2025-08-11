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
    const { chosenRating, leftRating, outcome, rightRating } = data;
    console.log("outcome", chosenRating);

    setReveal({
      chosenId: chosenItem.id,
      outcome,
      leftRating,
      rightRating,
    });

    //update score number
    //get new pair cards
    await sleep(1200);
    console.log("animation complete");
    fetchPair();
  };

  return (
    <div>
      {pair && (
        <div className="flex flex-row items-center justify-center min-h-screen gap-20">
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
