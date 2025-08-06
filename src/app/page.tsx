import Image from "next/image";
import AppButton from "./components/AppButton";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen pt-10">
      <h1 className="text-9xl font-bold mb-50 select-none ">HIGHER OR LOWER</h1>
      <AppButton>Play</AppButton>
    </main>
  );
}
