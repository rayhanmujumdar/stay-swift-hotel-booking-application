import BookingCard from './BookingCard';

export default function UpcomingBooking({ booking }) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">⌛️ Upcoming Bookings</h2>
            
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
