'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function SignIn() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Toby</h2>
                    <p className="text-gray-600">Sign in to manage your tabs efficiently</p>
                </div>

                <button
                    onClick={() => signIn('google', { callbackUrl: '/auth/success' })}
                    className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-4 border border-gray-300 rounded-lg shadow-sm transition duration-150 ease-in-out"
                >
                    <Image
                        src="/google.svg"
                        alt="Google Logo"
                        width={20}
                        height={20}
                    />
                    <span>Continue with Google</span>
                </button>

                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600">
                        By signing in, you agree to our{' '}
                        <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
