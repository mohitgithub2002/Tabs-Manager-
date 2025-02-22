import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
    const token = await getToken({ req: request });
    
    if (token && request.nextUrl.pathname === '/auth/signin') {
        return NextResponse.redirect(new URL('/auth/success', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/auth/:path*']
};
