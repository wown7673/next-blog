import fs, { ReadStream } from 'fs';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req:NextRequest , context : {params: {filename:string }}){
  const { filename } = context.params;
  const filenameWithPath = process.env.SERVER_FILE_DIR_PATH+filename;

  const fileBuffer = fs.readFileSync(filenameWithPath);



  const jsonData = fileBuffer;
  const status = 200;
  const headers = {
    'Content-Disposition': `attachment; filename=${filename}`,
    'Content-Type': 'application/octet-stream'    // 모든파일형식을 수용하는 content-type
  }

  return new NextResponse(jsonData, {headers:headers , status:status})

}