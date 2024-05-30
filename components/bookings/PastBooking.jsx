import BookingCard from './BookingCard';

export default function PastBooking({ booking }) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">🕛️ Past Bookings</h2>
            {booking.map(booked => {
                return (
                    <BookingCard
                        fromUpcoming
                        hotelId={booked?.hotelId}
                        checkIn={booked?.checkin}
                        checkout={booked?.checkout}
                    />
                );
            })}
        </div>
    );
}
