import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"; 
 
export async function GET(request: Request) { 
    const songs = await prisma.songs.findMany(); 
     
    return NextResponse.json(songs);
}