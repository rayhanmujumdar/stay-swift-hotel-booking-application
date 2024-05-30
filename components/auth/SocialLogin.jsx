'use client';
import { signIn } from 'next-auth/react';

export default function SocialLogin() {
    const handleSocialLogin = provider => {
        signIn(provider, { callbackUrl: 'http://localhost:3000/bookings' });
    };
    return (
        <div className="flex gap-4">
            <button className=" w-full mt-4 py-2 border-gray-600/30 border rounded-md flex items-center gap-2 justify-center">
                <img src="./assets/fb.png" alt="" />
                <span>Facebook</span>
            </button>
            <button
                onClick={() => handleSocialLogin('google')}
                className=" w-full mt-4 py-2 border-gray-600/30 border rounded-md flex items-center gap-2 justify-center"
            >
                <img src="./assets/google.png" alt="" />
                <span>Google</span>
            </button>
        </div>
    );
}
