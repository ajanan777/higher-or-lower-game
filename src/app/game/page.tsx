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

  return (
    <div>
      <h1> Hello</h1>
      {pair && (
        <>
          <ItemCard item={pair.first}></ItemCard>
        </>
      )}
    </div>
  );
}
