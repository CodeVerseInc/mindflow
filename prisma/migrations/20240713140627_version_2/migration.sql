/*
  Warnings:

  - You are about to drop the column `name` on the `books` table. All the data in the column will be lost.
  - Added the required column `name_book` to the `books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "books" DROP COLUMN "name",
ADD COLUMN     "name_book" TEXT NOT NULL;
