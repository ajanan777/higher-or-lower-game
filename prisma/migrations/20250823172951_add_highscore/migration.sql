-- CreateTable
CREATE TABLE "HighScore" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userID" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
