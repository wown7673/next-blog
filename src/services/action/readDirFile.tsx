'use server';

import path from 'path';
import os from 'os';


export async function readDirFile(){
  const folderPath = path.resolve('./', 'your-folder'); // 다운로드할 폴더 경로
  //console.log(folderPath);

  if(process.env.NODE_ENV === 'development'){
    console.log("개발");
    console.log(`${os.homedir()}\\Downloads`);  // 윈도우에서 Downloads 폴더 경로 ( 사용자, Administrator 상관없이 )
  }

  if(process.env.NODE_ENV === 'production'){
    console.log("운영");
  }


}