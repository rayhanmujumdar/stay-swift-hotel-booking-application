import { auth } from '@/auth';
import PaymentForm from '@/components/payment/PaymentForm';
import { getHotelById, getUserByEmail } from '@/database/queries';
import { getDateDistance } from '@/utils/data-utils';
import { redirect } from 'next/navigation';

export default async function PaymentPage({
    params: { id },
    searchParams: { checkIn, checkout },
}) {
    const session = await auth();
    if (!session) {
        return redirect('/login');
    }
    const userInfo = await getUserByEmail(session?.user?.email);
    const hotelInfo = await getHotelById(id, checkIn, checkout);
    let cost = (hotelInfo?.highRate + hotelInfo?.lowRate) / 2;
    if (checkIn && checkout) {
        const totalDays = getDateDistance(checkIn, checkout);
        cost = cost * totalDays;
    }
    return (
        <main>
            <section className="container">
                <div className="p-6 rounded-lg max-w-xl mx-auto my-12 mt-[100px]">
                    <h2 className="font-bold text-2xl text-center">
                        Payment Details
                    </h2>
                    <p className="text-gray-600 text-sm text-center">
                        You have picked <b>{hotelInfo?.name}</b> and base price
                        is <b>${cost}</b> for{' '}
                        {getDateDistance(checkIn, checkout)} day(s)
                    </p>
                </div>
                <div className="w-96 mx-auto">
                    <PaymentForm
                        hotelId={id}
                        isBooked={hotelInfo?.isBooked}
                        userInfo={userInfo}
                        checkIn={checkIn}
                        checkout={checkout}
                        cost={cost}
                    />
                </div>
            </section>
        </main>
    );
}
