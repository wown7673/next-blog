import Link from 'next/link';

export default function Page() {
  return (
    <main className={'flex items-center flex-col'}>
      <span>웰컴</span>
      <Link href={'/home'} className={'size-4'}>
        입장
      </Link>
    </main>
  );
}
