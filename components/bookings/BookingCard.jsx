import { getHotelById } from '@/database/queries';
import { getDateDistance } from '@/utils/data-utils';

export default async function BookingCard({
    fromUpcoming,
    hotelId,
    checkIn,
    checkout,
}) {
    const hotel = await getHotelById(hotelId);
    const days = getDateDistance(checkIn, checkout);
    const totalCost = ((hotel.highRate + hotel.lowRate) / 2) * days;
    return (
        <div
            className={`${
                fromUpcoming ? 'bg-[#F6F3E9]' : 'bg-[#ebf6e9]'
            } p-4 rounded-md`}
        >
            <div className="flex justify-between items-center ">
                <div>
                    <h3 className="text-xl font-semibold">{hotel?.name}</h3>
                    <div className="text-sm text-gray-600 my-4">
                        <p>Check In: {checkIn}</p>
                        <p>Check Out: {checkout}</p>
                    </div>
                </div>
                <div>
                    <h3 className="text-xl font-semibold text-right">
                        ${totalCost}
                    </h3>
                    <p className="text-sm text-gray-600">
                        ${totalCost / days} per night x {days} days
                    </p>
                </div>
            </div>
        </div>
    );
}
