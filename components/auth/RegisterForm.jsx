'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterForm() {
    const [error, setError] = useState();
    const router = useRouter();
    const onSubmit = async event => {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    fname: formData.get('fname'),
                    lname: formData.get('lname'),
                    email: formData.get('email'),
                    password: formData.get('password'),
                }),
            });
            if (!response.ok) {
                setError(response.statusText);
            } else {
                router.push('/login');
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
                    <label htmlFor="fname">First Name</label>
                    <input type="text" name="fname" id="fname" />
                </div>

                <div>
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" name="lname" id="lname" />
                </div>

                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" id="email" />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                </div>

                <button type="submit" className="btn-primary w-full mt-4">
                    Create account
                </button>
            </form>
        </>
    );
}
