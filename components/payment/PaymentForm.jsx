'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PaymentForm({
    userInfo,
    hotelId,
    isBooked,
    checkIn,
    checkout,
    cost,
}) {
    const [error, setError] = useState();
    const router = useRouter();
    const onSubmit = async event => {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            const checkin = formData.get('checkin');
            const checkout = formData.get('checkout');
            const userId = userInfo?.id;
            const response = await fetch('/api/payment', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    hotelId,
                    checkin,
                    checkout,
                }),
            });

            response.status === 201 && router.push('/bookings');
        } catch (err) {
            setError(err.message);
            console.log(err);
        }
    };
    return (
        <>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={onSubmit} className="my-8">
                <div className="my-4 space-y-2">
                    <label htmlFor="name" className="block">
                        Name
                    </label>
                    <input
                        value={userInfo?.name}
                        type="text"
                        id="name"
                        className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
                    />
                </div>

                <div className="my-4 space-y-2">
                    <label htmlFor="email" className="block">
                        Email
                    </label>
                    <input
                        value={userInfo?.email}
                        type="email"
                        id="email"
                        className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
                    />
                </div>

                <div className="my-4 space-y-2">
                    <span>Check in</span>
                    <h4 className="mt-2">
                        <input
                            value={checkIn}
                            type="date"
                            name="checkin"
                            id="checkin"
                        />
                    </h4>
                </div>

                <div className="my-4 space-y-2">
                    <span>Checkout</span>
                    <h4 className="mt-2">
                        <input
                            value={checkout}
                            type="date"
                            name="checkout"
                            id="checkout"
                        />
                    </h4>
                </div>

                <div className="my-4 space-y-2">
                    <label htmlFor="card" className="block">
                        Card Number
                    </label>
                    <input
                        type="text"
                        id="card"
                        className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
                    />
                </div>

                <div className="my-4 space-y-2">
                    <label htmlFor="expiry" className="block">
                        Expiry Date
                    </label>
                    <input
                        type="text"
                        id="expiry"
                        className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
                    />
                </div>

                <div className="my-4 space-y-2">
                    <label htmlFor="cvv" className="block">
                        CVV
                    </label>
                    <input
                        type="text"
                        id="cvv"
                        className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md"
                    />
                </div>

                <button
                    disabled={isBooked}
                    type="submit"
                    className="btn-primary w-full"
                >
                    Pay Now (${cost})
                </button>
            </form>
        </>
    );
}
