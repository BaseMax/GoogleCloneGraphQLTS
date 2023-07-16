/*
  Warnings:

  - Added the required column `updatedAt` to the `SearchResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SearchResult" ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
