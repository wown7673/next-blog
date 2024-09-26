import { NextRequest } from 'next/server';


export const config = {
  matcher: ['/' , '/contents']
}

export function middleware(request:NextRequest){
  console.log("미들웨어를 통과~");
}