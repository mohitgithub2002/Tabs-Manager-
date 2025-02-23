import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
    // Handle CORS
    if (request.method === 'OPTIONS') {
        return new NextResponse(null, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': 'chrome-extension://fahhijlogchblpjijfecepmmobadfaol',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, user-id',
                'Access-Control-Max-Age': '86400',
            },
        });
    }

    const response = NextResponse.next();

    // Add CORS headers to all responses
    response.headers.set('Access-Control-Allow-Origin', 'chrome-extension://fahhijlogchblpjijfecepmmobadfaol');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, user-id');

    // Handle authentication redirect if needed
    const token = await getToken({ req: request });
    if (token && request.nextUrl.pathname === '/auth/signin') {
        return NextResponse.redirect(new URL('/auth/success', request.url));
    }

    return response;
}

export const config = {
    matcher: [
        '/api/:path*',
        '/auth/:path*'
    ]
};
