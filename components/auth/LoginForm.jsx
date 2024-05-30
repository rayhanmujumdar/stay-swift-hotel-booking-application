'use client';

import { login } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
    const [error, setError] = useState();
    const router = useRouter();
    const onSubmit = async e => {
        e.preventDefault();
        try {
            const formData = new FormData(e.currentTarget);
            const response = await login(formData);
            if (!!response.error) {
                throw new Error(response.error);
            } else {
                router.push('/bookings');
            }
        } catch (err) {
            setError(err?.message);
        }
    };
    return (
        <>
            {error && (
                <div className="text-center text-sm text-red-400">{error}</div>
            )}
            <form onSubmit={onSubmit} className="login-form">
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" id="email" />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                </div>

                <button type="submit" className="btn-primary w-full mt-4">
                    Login
                </button>
            </form>
        </>
    );
}
