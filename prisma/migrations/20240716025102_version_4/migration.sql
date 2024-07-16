/*
  Warnings:

  - Added the required column `image_book` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_song` to the `songs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_song` to the `songs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books" ADD COLUMN     "image_book" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "songs" ADD COLUMN     "image_song" TEXT NOT NULL,
ADD COLUMN     "name_song" TEXT NOT NULL;
