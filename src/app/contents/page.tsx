import { Button } from '@/components/ui/button';

export default function ContentsPage() {
  function handleDownload() {}

  return (
    <main>
      <div>
        <span>파일다운로드</span>
        <Button onClick={handleDownload}>다운로드</Button>
      </div>
    </main>
  );
}
