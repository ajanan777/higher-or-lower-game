"use client";
import { useState } from "react";
import { useEffect } from "react";
import ItemCard from "../components/ItemCard";
import { Item, Pair } from "../data/types";

export default function Game() {
  const [pair, setPair] = useState<Pair | null>(null);
  const [isGuessing, setIsGuessing] = useState(false);

  const fetchPair = async () => {
    const response = await fetch("/api/pair");
    const data = await response.json();
    setPair(data);
  };

  useEffect(() => {
    fetchPair();
  }, []);

  const yeah = async () => {};

  const handleClick = async (item: Item) => {
    if (!pair || isGuessing) {
      console.log(isGuessing);
      return;
    }
    setIsGuessing(true);
    try {
      const response = await fetch("/api/guess", {
        method: "POST", //HTTP method
        headers: {
          "Content-Type": "application/json", //telling backend i am sending JSON
        },
        body: JSON.stringify({
          leftID: pair.first.id,
          rightID: pair.second.id,
          chosenID: item.id,
        }),
      });
      const data = await response.json();
      console.log(data);
    } finally {
      console.log("guess complete");
      setIsGuessing(false);
    }
  };

  return (
    <div>
      {pair && (
        <div className="flex flex-row items-center justify-center min-h-screen gap-20">
          <div className={!isGuessing ? "cursor-pointer" : ""}>
            <ItemCard
              item={pair.first}
              onClick={() => handleClick(pair.first)}
              disabled={isGuessing}
            />
          </div>
          <div className={!isGuessing ? "cursor-pointer" : ""}>
            <ItemCard
              item={pair.second}
              onClick={() => handleClick(pair.second)}
              disabled={isGuessing}
            />
          </div>
        </div>
      )}
    </div>
  );
}
