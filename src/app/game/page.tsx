"use client";
import { useState } from "react";
import { useEffect } from "react";
import ItemCard from "../components/ItemCard";
import { Item, Pair, GuessResponse, RevealState } from "../data/types";
import { useSearchParams } from "next/navigation";
import ScanLines from "../components/ScanLines";
import { useRouter } from "next/navigation";
import NeonRails from "../components/NeonRails";
import { useSession } from "next-auth/react";

type Mode = "easy" | "medium" | "hard";

export default function Game() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const search = useSearchParams();
  const rawMode = search.get("mode") ?? "easy";
  const mode: Mode = (["easy", "medium", "hard"] as const).includes(
    rawMode as Mode
  )
    ? (rawMode as Mode)
    : "easy";

  // delay helper function
  const sleep = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));

  const [pair, setPair] = useState<Pair | null>(null);
  const [isGuessing, setIsGuessing] = useState(false);
  const [reveal, setReveal] = useState<RevealState | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const fetchPair = async () => {
    console.log("fetching pair...");
    const response = await fetch(`/api/pair?mode=${encodeURIComponent(mode)}`);
    const data = await response.json();
    setPair(data);
    console.log("pair fetched");
    setReveal(null);
  };

  const handleLoginClicked = () => {
    router.push("/login"); // unchanged
  };

  const getHighScoreDB = async () => {
    if (status === "unauthenticated") {
      return;
    } else {
      try {
        const response = await fetch("/api/highscore", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mode: mode,
          }),
        });

        if (!response.ok) {
          throw new Error("Server returned error (getHighscoreDB)");
        }
        const data = await response.json();
        setHighScore(data.score);
        return;
      } catch (err) {
        console.error("Failed getHighscore request", err);
      }
    }
  };

  useEffect(() => {
    fetchPair();
    getHighScoreDB();
  }, []);

  const handleClick = async (chosenItem: Item, otherItem: Item) => {
    console.log("handling click...");
    if (!pair || isGuessing || reveal) {
      console.log(isGuessing);
      return;
    }
    setIsGuessing(true);
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
    // await sleep(200);
    if (outcome === false) {
      await sleep(400);
    }
    if (outcome === true) {
      await sleep(350);
    }
    console.log("animation complete");
    fetchPair();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050014]">
      <div
        className={`fixed inset-0 pointer-events-none z-50 ${
          reveal
            ? reveal.outcome
              ? // GREEN
                "shadow-[inset_0_0_20px_6px_rgba(34,255,136,0.2),inset_0_0_80px_28px_rgba(34,255,136,0.2),inset_0_0_160px_64px_rgba(34,255,136,0.18)] animate-pulse"
              : // RED
                "shadow-[inset_0_0_20px_6px_rgba(255,48,48,0.1),inset_0_0_80px_28px_rgba(255,48,48,0.1),inset_0_0_160px_64px_rgba(255,48,48,0.18)] animate-pulse"
            : score > 0 && score === highScore
            ? // GRADIENT blue
              "shadow-[inset_0_0_20px_6px_rgba(0,208,255,0.45),inset_0_0_100px_28px_rgba(255,213,206,0.23),inset_0_0_160px_64px_rgba(34,255,136,0.18)] animate-pulse"
            : // BLUE default
              "shadow-[inset_0_0_16px_4px_rgba(161, 3, 252,0.25),inset_0_0_100px_24px_rgba(161, 3, 252,0.15),inset_0_0_140px_56px_rgba(161, 3, 2520.10)] animate-[pulse_3.5s_ease-in-out_infinite]"
        }`}
      />

      <ScanLines lines={true}></ScanLines>
      <div className="opacity-85">
        <NeonRails></NeonRails>
      </div>

      {/* stuff */}
      <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center select-none">
        <h1 className="text-8xl text-[#7df9ff] font-extrabold drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] animate-pulse [animation-duration:5s] [-webkit-text-stroke:2px_#00935c]">
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
        <div className="relative z-10 flex pt-20 flex-row items-center justify-center min-h-screen gap-20 select-none">
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
