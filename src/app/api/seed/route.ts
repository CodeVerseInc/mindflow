import { NextResponse, NextRequest } from "next/server"; 
import prisma from "@/lib/prisma"; 
 
export async function GET(request: Request) {    
     
    await prisma.songs.deleteMany() //! Delete all songs
     
    await prisma.songs.createMany({ 
        data: [ 
            { url_song: 'https://res.cloudinary.com/dlklqucye/video/upload/v1720841911/mindflow/songs/1_awh3d6.mp3' }, 
            { url_song: 'https://res.cloudinary.com/dlklqucye/video/upload/v1720841885/mindflow/songs/2_wpgfrs.mp3' },
            { url_song: 'https://res.cloudinary.com/dlklqucye/video/upload/v1720841873/mindflow/songs/3_a4d1am.mp3' },
            { url_song: 'https://res.cloudinary.com/dlklqucye/video/upload/v1720841893/mindflow/songs/4_loliep.mp3' },
            { url_song: 'https://res.cloudinary.com/dlklqucye/video/upload/v1720841900/mindflow/songs/5_wsqdfg.mp3' },
            { url_song: 'https://res.cloudinary.com/dlklqucye/video/upload/v1720841873/mindflow/songs/6_ummgri.mp3' },
            { url_song: 'https://res.cloudinary.com/dlklqucye/video/upload/v1720841889/mindflow/songs/7_ww02tk.mp3' },
            { url_song: 'https://res.cloudinary.com/dlklqucye/video/upload/v1720841903/mindflow/songs/8_pjx6jg.mp3' },
            { url_song: 'https://res.cloudinary.com/dlklqucye/video/upload/v1720841880/mindflow/songs/9_urebxg.mp3' },
            { url_song: 'https://res.cloudinary.com/dlklqucye/video/upload/v1720841870/mindflow/songs/10_rlsodh.mp3' },
        ]
    })
     

    return NextResponse.json({ message: 'Sucefully seed' });
}