import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { mode } = body;

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const row = await prisma.highScore.findUnique({
      where: { userID: session.user.id },
      select: { easyScore: true, mediumScore: true, hardScore: true },
    });

    const score =
      mode === "easy"
        ? row?.easyScore
        : mode === "medium"
        ? row?.mediumScore
        : row?.hardScore;

    return NextResponse.json({ score: score ?? 0 });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.error(e);
    }
    return NextResponse.json(
      { error: "POST request for highscore failed" },
      { status: 500 }
    );
  }
}
