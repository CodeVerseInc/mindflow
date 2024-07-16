import prisma from '@/lib/prisma';
import {  NextResponse } from 'next/server'; 
 
interface Segments { 
    params: { 
        id: string;
    }
} 
 
export async function GET(request: Request, { params }: Segments) { 
     
    const { id } = params; 
    const book = await prisma.books.findFirst({ where: { id } }); 
     
    if (!book) { 
        return NextResponse.json({ mesage: `Libro con id ${id} no existe` }, { status: 404 });
    } 

    return NextResponse.json(book);
}