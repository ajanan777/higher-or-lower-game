"use client";
import { useState } from "react";
import { useEffect } from "react";
import ItemCard from "../components/ItemCard";
import { Item, Pair } from "../data/types";

export default function Game() {
  const [pair, setPair] = useState<Pair | null>(null);

  const fetchPair = async () => {
    const response = await fetch("/api/pair");
    const data = await response.json();
    setPair(data);
  };

  useEffect(() => {
    fetchPair();
  }, []);

  const handleClick = async (item: Item) => {
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
  };

  return (
    <div>
      {pair && (
        <div className="flex flex-row items-center justify-center min-h-screen gap-20">
          <ItemCard item={pair.first} onClick={() => handleClick(pair.first)} />
          <ItemCard
            item={pair.second}
            onClick={() => handleClick(pair.second)}
          />
        </div>
      )}
    </div>
  );
}
