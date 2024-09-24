'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import AutoScroll from 'embla-carousel-auto-scroll';
import Link from 'next/link';

export default function HomePage() {
  const menus = [
    { name: '로또', route: '/lottery' },
    { name: '콘텐츠', route: '/contents' },
    { name: '후추1', route: '/' },
    { name: '후추2', route: '/' },
    { name: '후추3', route: '/' },
    { name: '후추4', route: '/' },
    { name: '후추5', route: '/' },
  ];

  return (
    <main className="flex justify-center border-4 min-h-screen items-center">
      <Carousel
        className="w-full max-w-xl"
        opts={{ loop: true }}
        plugins={[AutoScroll({ speed: 2 })]}
      >
        <CarouselContent>
          {menus.map((menu, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Link href={menu.route}>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{menu.name}</span>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  );
}
