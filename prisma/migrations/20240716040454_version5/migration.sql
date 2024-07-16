/*
  Warnings:

  - You are about to drop the column `image` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `songs` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `songs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "books" DROP COLUMN "image";

-- AlterTable
ALTER TABLE "songs" DROP COLUMN "image",
DROP COLUMN "name";
