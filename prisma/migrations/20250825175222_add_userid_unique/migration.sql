/*
  Warnings:

  - You are about to drop the column `mode` on the `HighScore` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `HighScore` table. All the data in the column will be lost.
  - Added the required column `easyScore` to the `HighScore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hardScore` to the `HighScore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mediumScore` to the `HighScore` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HighScore" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userID" TEXT NOT NULL,
    "easyScore" INTEGER NOT NULL,
    "mediumScore" INTEGER NOT NULL,
    "hardScore" INTEGER NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_HighScore" ("id", "updatedAt", "userID") SELECT "id", "updatedAt", "userID" FROM "HighScore";
DROP TABLE "HighScore";
ALTER TABLE "new_HighScore" RENAME TO "HighScore";
CREATE UNIQUE INDEX "HighScore_userID_key" ON "HighScore"("userID");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
