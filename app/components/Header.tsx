"use client";

import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="pb-6 pt-12">
      <div className="flex flex-col items-center justify-center gap-3">
        <Link href="/" className="block w-12 h-12 relative">
          <Image
            src="/icon.png"
            alt="Browserfax Logo"
            fill
            className="object-contain"
            priority
          />
        </Link>
        <Link href="/" className="text-3xl font-bold italic font-['Kanit']">
          BROWSERFAX
        </Link>
      </div>
    </header>
  );
}