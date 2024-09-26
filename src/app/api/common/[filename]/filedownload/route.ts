import fs from 'fs';
import { NextRequest } from 'next/server';


export async function GET(req){
  const fileFullPath = process.env.SERVER_FILE_DIR_PATH+filename;

  Response.json({aa:11});
  if(fs.existsSync(fileFullPath)){
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Conentet-Type', 'mp4');
    fs.createReadStream(fileFullPath).pipe(res); // 파일을 클라이언트에 전송
  }else{
    res.status(404).json({message:'파일을 찾을 수 없음'});
  }
}