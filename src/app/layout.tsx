// app/layout.tsx

'use client';

import './globals.css';
import { ResumeProvider } from '@/context/ResumeContext';
// import Link from 'next/link';
import { Navbar } from '@/components/navbar';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
      <div className="min-h-screen flex flex-col">      
        <Navbar 
        className="px-4"
        routes={
          [
            {name: 'Home', path: '/'},
            {name: 'Resume', path: '/resume'},
            // {name: 'Preview', path: '/preview'}
          ]
        }
        buttonLink='/resume'
        /> 
        <ResumeProvider>
        <main className="flex-1 container py-8">{children}</main>
        </ResumeProvider>
        </div>
      </body>
    </html>
  );
}