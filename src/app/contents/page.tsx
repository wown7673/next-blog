'use client';

import { Button } from '@/components/ui/button';
import downloadFile from '@/services/action/downloadFile';
import { readDirFile } from '@/services/action/readDirFile';


export default function ContentsPage() {


  async function handleFileDownload() {
    //await downloadFile("어벤져스.mp4");
  }



  return (
    <main>
      <div>
        <span>파일다운로드</span>
        <Button onClick={handleFileDownload}>다운로드</Button>

        
        
        <a href='/api/어벤져스.mp4/filedownload' download>파일다운로드</a>
      </div>
    </main>
  );
}
