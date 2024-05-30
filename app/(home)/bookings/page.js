import { auth } from '@/auth';
import PastBooking from '@/components/bookings/PastBooking';
import ProfileInfo from '@/components/bookings/ProfileInfo';
import UpcomingBooking from '@/components/bookings/UpcomingBooking';
import { getBookingsByUserId, getUserByEmail } from '@/database/queries';
import { redirect } from 'next/navigation';

export default async function BookingPage() {
    const session = await auth();
    if (!session) {
        return redirect('/login');
    }
    const loggedInUser = await getUserByEmail(session?.user?.email);
    const bookings = await getBookingsByUserId(loggedInUser.id);
    const pastBooking = bookings.filter(booking => {
        return new Date().getTime() > new Date(booking.checkin).getTime();
    });

    const upcomingBooking = bookings.filter(booking => {
        return new Date().getTime() < new Date(booking.checkin).getTime();
    });

    return (
        <main>
            <section className="mt-[100px]">
                <div className="container">
                    <ProfileInfo />
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <PastBooking booking={pastBooking} />
                        <UpcomingBooking booking={upcomingBooking} />
                    </div>
                </div>
            </section>
        </main>
    );
}
