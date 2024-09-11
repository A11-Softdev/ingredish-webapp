'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Footer from "@/components/footer";
import './globals.css';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <html lang="en">
      <body>{children}<Footer/></body>
    </html>
  );
}
