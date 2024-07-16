import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"; 
 
export async function GET(request: Request) {  
     
    const { searchParams } = new URL(request.url) 
    const take = Number(searchParams.get('take') ?? '10');  
    const skip = Number(searchParams.get('skip') ?? '0'); 
 
    if (isNaN(take)) { 
        return NextResponse.json({ message: 'Take tiene que ser un número'}, { status: 400 });
    }
     
    if (isNaN(skip)) { 
        return NextResponse.json({ message: 'Skip tiene que ser un número'}, { status: 400 });
    } 

    const songs = await prisma.songs.findMany({ take, skip }); 
     
    return NextResponse.json(songs);
}