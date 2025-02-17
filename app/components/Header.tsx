"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="pb-6 pt-12">
      <div className="flex items-center justify-center gap-3">
        <Link href="/" className="block w-8 h-8 relative">
          <Image
            src="/icon-cropped.png"
            alt="Raptor Explorer Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>
        <Link href="/" className="text-3xl font-bold italic font-['Kanit']">
          RAPTOR EXPLORER
        </Link>
      </div>
    </header>
  );
}