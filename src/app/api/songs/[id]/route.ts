import prisma from '@/lib/prisma'
import {  NextResponse } from 'next/server' 
 
interface Segments { 
    params: { 
        id: string;
    }
} 
 
export async function GET(request: Request, { params }: Segments) { 
     
    const { id } = params 
    const song = await prisma.songs.findFirst({ where: { id } }) 
     
    if (!song) { 
        return NextResponse.json({ mesage: `Canción con id ${id} no existe` }, { status: 404 })
    } 

    return NextResponse.json(song)
}