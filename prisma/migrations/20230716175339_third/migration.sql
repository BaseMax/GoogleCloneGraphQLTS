/*
  Warnings:

  - Added the required column `category` to the `SearchResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `SearchResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `SearchResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SearchResult" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL DEFAULT 0;
