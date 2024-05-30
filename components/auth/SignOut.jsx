'use client';

import { signOut } from 'next-auth/react';

export default function SignOut() {
    const handleSignOut = () => {
        signOut({
            callbackUrl: `${process.env.NEXT_PUBLIC_LOCAL_URL}/login`,
        });
    };
    return (
        <button onClick={handleSignOut} className="login">
            Sign out
        </button>
    );
}
