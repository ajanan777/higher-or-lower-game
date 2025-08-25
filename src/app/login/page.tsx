"use client";
import Image from "next/image";
import AppButton from "../components/AppButton";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ScanLines from "../components/ScanLines";
import { LogIn, Undo2 } from "lucide-react";
import AuthButtons from "../components/AuthButtons";
import NeonRails from "../components/NeonRails";

export default function Home() {
  const router = useRouter();

  const handlePlayClicked = () => {
    router.push("/"); // unchanged
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#11002a] text-white px-6">
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_45%,rgba(0,0,0,0.6)_100%)]" />
      <ScanLines lines={false}></ScanLines>
      <NeonRails></NeonRails>

      {/* ===== HERO ===== */}
      <section className="relative w-full max-w-3xl text-center z-10">
        {/* gentle conic glow behind panel */}
        <div
          className="pointer-events-none absolute -inset-1 -z-10 rounded-[2rem]
          bg-[conic-gradient(from_210deg_at_50%_50%,rgba(0,223,252,0.22),rgba(255,113,206,0.22),rgba(5,255,161,0.22),rgba(0,223,252,0.22))]
          blur opacity-45"
        />

        <div
          className="rounded-[1.6rem] px-10 py-12 md:px-16 md:py-14
          bg-white/5 backdrop-blur-md ring-1 ring-white/10
          shadow-[0_10px_60px_rgba(0,0,0,0.55),inset_0_0_30px_rgba(0,0,0,0.25)]"
        >
          <h1
            className="select-none text-5xl md:text-7xl font-extrabold tracking-[0.06em]
            text-transparent bg-clip-text
            bg-gradient-to-r from-[#7df9ff] via-[#00dffc] to-[#ff71ce]
            drop-shadow-[0_0_18px_rgba(0,223,252,0.45)]"
          >
            SIGN/LOG IN
          </h1>
          <div className="mt-5 flex justify-center transition-transform duration-500 ease-in-out hover:-translate-y-1 hover:scale-102">
            <AppButton onClick={handlePlayClicked}>
              <span className="flex items-center gap-2">
                <Undo2 size={30} strokeWidth={3} />
                Back
              </span>
            </AppButton>
          </div>

          <div className="mt-5 flex justify-center">
            <AuthButtons></AuthButtons>
          </div>
        </div>
      </section>
    </main>
  );
}
