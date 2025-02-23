import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Instructions | Raptor Explorer - Car Sharing Analytics Tool',
  description: 'Learn how to use Raptor Explorer, the Chrome extension for Car Sharing analytics. Get detailed instructions on installing and using our tool to analyze Turo car listings in your area.',
  openGraph: {
    title: 'Raptor Explorer Instructions - Car Sharing Analytics Tool',
    description: 'Complete guide on using Raptor Explorer to analyze Turo car listings and market data',
    type: 'article',
    publishedTime: '2025-02-22T00:00:00.000Z',
    authors: ['West Wanted LLC'],
  }
};

export default function InstructionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}