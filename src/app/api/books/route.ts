import prisma from "@/lib/prisma";
import { NextResponse } from "next/server"; 
 
export async function GET(request: Request) { 
    const books = await prisma.books.findMany(); 
     
    return NextResponse.json(books);
}