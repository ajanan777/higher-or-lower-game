import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // use the singleton you made

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userID, mode, score } = body;

    const newScore = await prisma.highScore.create({
      data: {
        userID,
        mode,
        score,
      },
    });

    return NextResponse.json(newScore);
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: "DB insert failed" }, { status: 500 });
  }
}
