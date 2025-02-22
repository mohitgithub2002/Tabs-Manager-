'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function AuthSuccess() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'authenticated' && session) {
            const extensionId = `fahhijlogchblpjijfecepmmobadfaol`;
            const data = {
                'user-id': session.user.id,
                'access-token': session.user.accessToken,
                'name': session.user.name
            };
            chrome.runtime.sendMessage(extensionId, { action: 'store_token', data }, (response) => {
                console.log('Response from extension:', response);
            });
        }
    }, [session, status]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Redirecting to extension...</p>
        </div>
    );
}
