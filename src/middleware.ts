import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const token = req.cookies.get('token');
    const { pathname } = req.nextUrl;

    if (pathname === '/home' || pathname === '/login' || pathname === '/register') {
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    // Protected Route
    matcher: ['/post', '/profile', '/searchmenu', '/generateAIRecipe'],
};
