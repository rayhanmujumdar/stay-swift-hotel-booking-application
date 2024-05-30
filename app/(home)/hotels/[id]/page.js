import Gallery from '@/components/hotel/Gallery';
import Overview from '@/components/hotel/Overview';
import Summery from '@/components/hotel/Summery';
import { getHotelById } from '@/database/queries';

export default async function HotelDetailsPage({
    params: { id },
    searchParams,
}) {
    const { destination, checkIn, checkout } = searchParams;
    const hotel = await getHotelById(id, checkIn, checkout);
    return (
        <main>
            <Summery hotelInfo={hotel} checkIn={checkIn} checkout={checkout} />
            <Gallery gallery={hotel?.gallery} />
            <Overview overview={hotel?.overview} />
        </main>
    );
}
