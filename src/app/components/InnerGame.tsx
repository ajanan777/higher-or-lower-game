"use client";
import { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";
import { Item, Pair, GuessResponse, RevealState } from "../data/types";
import { useSearchParams, useRouter } from "next/navigation";
import ScanLines from "../components/ScanLines";
import NeonRails from "../components/NeonRails";
import { useSession } from "next-auth/react";

type Mode = "easy" | "medium" | "hard";

export default function InnerGame() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const search = useSearchParams();
  const rawMode = search.get("mode") ?? "easy";
  const mode: Mode = (["easy", "medium", "hard"] as const).includes(
    rawMode as Mode
  )
    ? (rawMode as Mode)
    : "easy";

  const sleep = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));

  const [pair, setPair] = useState<Pair | null>(null);
  const [isGuessing, setIsGuessing] = useState(false);
  const [reveal, setReveal] = useState<RevealState | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const fetchPair = async () => {
    const response = await fetch(`/api/pair?mode=${encodeURIComponent(mode)}`);
    const data = await response.json();
    setPair(data);
    setReveal(null);
  };

  const handleLoginClicked = () => {
    router.push("/login");
  };

  const getHighScoreDB = async () => {
    if (status === "unauthenticated") return;
    try {
      const response = await fetch("/api/highscore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode }),
      });
      if (!response.ok)
        throw new Error("Server returned error (getHighscoreDB)");
      const data = await response.json();
      setHighScore(data.score);
    } catch (err) {
      console.error("Failed getHighscore request", err);
    }
  };

  useEffect(() => {
    fetchPair();
    getHighScoreDB();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = async (chosenItem: Item, otherItem: Item) => {
    if (!pair || isGuessing || reveal) return;
    setIsGuessing(true);
    try {
      const response = await fetch("/api/guess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leftID: pair.first.id,
          rightID: pair.second.id,
          chosenID: chosenItem.id,
          score,
          highScore,
          mode,
        }),
      });
      const data = await response.json();
      outcomeReveal(data, chosenItem);
    } finally {
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

    setReveal({ chosenId: chosenItem.id, outcome, leftRating, rightRating });
    setHighScore(newHighScore);
    setScore(newScore);

    if (outcome === false) await sleep(400);
    if (outcome === true) await sleep(350);
    fetchPair();
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050014]">
      <div
        className={`fixed inset-0 pointer-events-none z-50 ${
          reveal
            ? reveal.outcome
              ? "shadow-[inset_0_0_20px_6px_rgba(34,255,136,0.2),inset_0_0_80px_28px_rgba(34,255,136,0.2),inset_0_0_160px_64px_rgba(34,255,136,0.18)] animate-pulse"
              : "shadow-[inset_0_0_20px_6px_rgba(255,48,48,0.1),inset_0_0_80px_28px_rgba(255,48,48,0.1),inset_0_0_160px_64px_rgba(255,48,48,0.18)] animate-pulse"
            : score > 0 && score === highScore
            ? "shadow-[inset_0_0_20px_6px_rgba(0,208,255,0.45),inset_0_0_100px_28px_rgba(255,213,206,0.23),inset_0_0_160px_64px_rgba(34,255,136,0.18)] animate-pulse"
            : "shadow-[inset_0_0_16px_4px_rgba(161, 3, 252,0.25),inset_0_0_100px_24px_rgba(161, 3, 252,0.15),inset_0_0_140px_56px_rgba(161, 3, 2520.10)] animate-[pulse_3.5s_ease-in-out_infinite]"
        }`}
      />

      <ScanLines lines={true} />
      <div className="opacity-85">
        <NeonRails />
      </div>

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
