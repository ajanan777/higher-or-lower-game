-- CreateTable
CREATE TABLE "public"."HighScore" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "easyScore" INTEGER NOT NULL,
    "mediumScore" INTEGER NOT NULL,
    "hardScore" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HighScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HighScore_userID_key" ON "public"."HighScore"("userID");
