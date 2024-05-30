import { getAllHotels } from '@/database/queries';
import HotelCard from './HotelCard';
import NoHotel from './NoHotel';

export default async function HotelList({
    destination,
    checkIn,
    checkout,
    categories,
}) {
    const hotels = await getAllHotels(
        destination,
        checkIn,
        checkout,
        categories
    );
    return (
        <div className="col-span-9">
            <div className="space-y-4">
                {hotels.length > 0 ? (
                    hotels.map(hotel => (
                        <HotelCard
                            key={hotel.id}
                            hotel={hotel}
                            destination={destination}
                            checkIn={checkIn}
                            checkout={checkout}
                        />
                    ))
                ) : (
                    <NoHotel />
                )}
            </div>
        </div>
    );
}
