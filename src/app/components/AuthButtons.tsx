"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import AppButton from "./AppButton";
import { LogOut } from "lucide-react";
import { LogIn } from "lucide-react";

export default function AuthButtons() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <p
        className="select-none font-extrabold tracking-[0.06em]
            text-transparent bg-clip-text
            bg-gradient-to-r from-[#7df9ff] via-[#00dffc] to-[#ff71ce]
            drop-shadow-[0_0_18px_rgba(0,223,252,0.45)]"
      >
        Loading...
      </p>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="transition-transform duration-500 ease-in-out hover:-translate-y-1 hover:scale-102">
        <AppButton onClick={() => signIn("google")}>
          <span className="flex items-center gap-2">
            <LogIn size={30} strokeWidth={3} />
            Sign in with Google
          </span>
        </AppButton>

        {/* later: <AppButton onClick={() => signIn("github")}>Sign in with GitHub</AppButton> */}
      </div>
    );
  }

  return (
    <div>
      <div className="transition-transform duration-500 ease-in-out hover:-translate-y-1 hover:scale-102">
        <AppButton onClick={() => signOut()}>
          <span className="flex items-center gap-2">
            <LogOut size={30} strokeWidth={3} />
            Sign out
          </span>
        </AppButton>
      </div>

      <div
        className="select-none font-bold tracking-[0.06em]
            text-transparent bg-clip-text
            bg-gradient-to-r from-[#ff60fa] via-[#00dffc] to-[#ff71ce]
            drop-shadow-[0_0_18px_rgba(0,223,252,0.45)] mt-2"
      >
        <p>Signed in as {session?.user?.email}</p>
      </div>
    </div>
  );
}
