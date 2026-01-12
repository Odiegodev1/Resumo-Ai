-- CreateEnum
CREATE TYPE "Plan" AS ENUM ('FREE', 'PRO');

-- CreateEnum
CREATE TYPE "SummarySize" AS ENUM ('CURTO', 'MEDIO', 'DETALHADO');

-- CreateEnum
CREATE TYPE "SummaryStyle" AS ENUM ('ACADEMICO', 'SIMPLES', 'TOPICOS');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "plan" "Plan" NOT NULL DEFAULT 'FREE';

-- CreateTable
CREATE TABLE "Summary" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "original" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "style" "SummaryStyle" NOT NULL,
    "size" "SummarySize" NOT NULL,
    "wordCount" INTEGER NOT NULL,
    "summaryCount" INTEGER NOT NULL,
    "timeSavedSec" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Summary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Summary_userId_createdAt_idx" ON "Summary"("userId", "createdAt");

-- AddForeignKey
ALTER TABLE "Summary" ADD CONSTRAINT "Summary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
