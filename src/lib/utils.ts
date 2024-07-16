import prisma from './prisma'

export async function getSongs() {
  const songs = await prisma.songs.findMany()
  return songs
}

export async function getBooks() {
  const books = await prisma.books.findMany()
  return books
}
