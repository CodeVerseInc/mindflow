/*
  Warnings:

  - You are about to drop the column `link` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `name_song` on the `songs` table. All the data in the column will be lost.
  - Added the required column `url_book` to the `books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url_song` to the `songs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books" DROP COLUMN "link",
ADD COLUMN     "url_book" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "songs" DROP COLUMN "name_song",
ADD COLUMN     "url_song" TEXT NOT NULL;
