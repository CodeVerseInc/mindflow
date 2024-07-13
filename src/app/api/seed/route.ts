import { NextResponse, NextRequest } from "next/server"; 
 
export async function GET(request: Request) { 
    return NextResponse.json({ message: 'Sucefully seed' });
}