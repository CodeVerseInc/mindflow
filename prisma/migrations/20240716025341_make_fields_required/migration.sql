/*
  Warnings:

  - Added the required column `image` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `songs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "songs" ADD COLUMN     "name" TEXT NOT NULL;
