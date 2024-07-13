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
     
    //? This seed is provisional for url_book undefined
     
    await prisma.books.deleteMany() //! Deelete all books  
     
    await prisma.books.createMany({ 
        data: [ 
            {name_book: 'Habitos Atómicos', url_book: 'https://drive.google.com/file/d/1A1UlLuvmuXP1RKGJeSHnmGFa3bypqSPW/view?usp=sharing' }, 
            {name_book: '48 leyes del poder', url_book: 'https://drive.google.com/file/d/17s9nUGQg4QUbAyT1Z2Km8qCALihzlpw2/view?usp=sharing' },
            {name_book: 'Tus zonas erroneas', url_book: 'https://drive.google.com/file/d/1yh20CWcHgGW52_O8GitCn17zeeyPmcUP/view?usp=sharing' },
            {name_book: 'El club de las 5 de la mañana', url_book: 'https://drive.google.com/file/d/1WPqbVDlG4KP6CCPfJ4whYBNYdpHdHsk6/view?usp=sharing' },
            {name_book: 'Espabila de una p*ta vez', url_book: 'https://drive.google.com/file/d/1sVmz_uwQoVG0wJLyuiB7AX_Ym8FhRGd7/view?usp=sharing' },
            {name_book: 'Meditaciones', url_book: 'https://drive.google.com/file/d/1tbdvfyNDgKxvaNPUd_Ao0JYzYj0C8ccn/view?usp=sharing' },
            {name_book: 'La vida son 2 p*tos días', url_book: 'https://drive.google.com/file/d/18bYlEWSPxZfhu6OU77eJnIdDUckwOkDO/view?usp=sharing' },
            {name_book: 'Quien se ha llevado mi queso', url_book: 'https://drive.google.com/file/d/1XMobjvkwLCGJVW-y_lI7eQ0KhOiLwIfr/view?usp=sharing' },
            {name_book: 'El monge que vendió su ferrari', url_book: 'https://drive.google.com/file/d/1J4FL_ObfLmi8--2cZ8I1ncm_M0215EVp/view?usp=sharing' },
            {name_book: 'Manual de vida', url_book: 'https://drive.google.com/file/d/1vOizDccZ0B8k4FCz1sdkiRaNH2S3VD24/view?usp=sharing' },
        ]
    })
     

    return NextResponse.json({ message: 'Sucefully seed' });
}