import prisma from './prisma'

export async function getSongs() {
  const songs = await prisma.songs.findMany()
  return songs
}
