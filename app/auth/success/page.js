'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function AuthSuccess() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'authenticated' && session) {
            const extensionUrl = new URL('chrome-extension://hddnkoipeenegfoeaoibdmnaalmgkpip/toby.html');
            const params = new URLSearchParams({
                'user-id': session.user.id,
                'refresh-token': session.user.accessToken,
                'name': session.user.name
            });
            console.log(session);
            console.log(params.toString());
            extensionUrl.search = params.toString();
            // window.location.href = extensionUrl.toString();
        }
    }, [session, status]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Redirecting to extension...</p>
        </div>
    );
}
