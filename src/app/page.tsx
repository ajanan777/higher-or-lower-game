"use client";
import Image from "next/image";
import AppButton from "./components/AppButton";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handlePlayClicked = () => {
    router.push("/game");
  };

  const fetchThing = async () => {
    const response = await fetch("/api/mal/search");
    const data = await response.json();
    console.log(data);
  };

  const fetchPairz = async () => {
    const response = await fetch("/api/pair");
    const data = await response.json();
    console.log(data);
  };

  // Replace with your actual Client ID from MAL's API panel
  return (
    <main className="flex flex-col items-center min-h-screen pt-20">
      <h1 className="text-6xl font-bold mb-50 select-none ">HIGHER OR LOWER</h1>
      <AppButton onClick={fetchPairz}>Play</AppButton>
    </main>
  );
}
