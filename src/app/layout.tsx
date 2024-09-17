'use client';

import NavBar from '@/components/NavBar';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Footer from "@/components/footer";
import './globals.css';
import {Providers} from "./providers";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      // router.push('/login');
    }
  }, [router]);

  return (
    <html lang="en">
      <body>
        <Providers>
          <NavBar />
          {children}
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
