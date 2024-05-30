import Link from 'next/link';
import HotelRating from './HotelRating';
import HotelReview from './HotelReview.jsx';

export default function HotelSummery({
    formDetails,
    hotelInfo,
    destination,
    checkIn,
    checkout,
}) {
    const {
        id,
        name,
        city,
        highRate,
        lowRate,
        thumbNailUrl,
        propertyCategory,
        isBooked,
    } = hotelInfo || {};
    const averagePrice = (highRate + lowRate) / 2;
    let params = '';
    if (checkIn && checkout) {
        params = `?checkIn=${checkIn}&checkout=${checkout}`;
    }
    return (
        <>
            <div className={`flex-1 ${formDetails && 'container'}`}>
                {formDetails ? (
                    <h2 className={`font-bold text-2xl`}>{name}</h2>
                ) : (
                    <Link className="font-bold text-lg" href={`/hotels/${id}`}>
                        {name}
                    </Link>
                )}
                <p>📍 {city}</p>
                <div className="flex gap-2 items-center my-4">
                    <HotelRating hotelId={id} />
                    <HotelReview hotelId={id} />
                    <span className="font-bold">
                        {isBooked ? 'Booked' : 'Available'}
                    </span>
                </div>
                <div>
                    <span className="bg-yellow-300 p-1 rounded-md">
                        {propertyCategory} Star Property
                    </span>
                </div>
            </div>
            <div className="flex flex-col gap-2 items-end justify-center">
                <h2 className="text-2xl font-bold text-right">
                    ${averagePrice}/night
                </h2>
                <p className=" text-right">Per Night for 4 Rooms</p>
                {formDetails ? (
                    <Link
                        href={isBooked ? '#' : `/hotels/${id}/payment${params}`}
                        className={isBooked ? 'btn-disabled' : 'btn-primary'}
                    >
                        Book Now
                    </Link>
                ) : (
                    <Link
                        className="btn-primary "
                        href={`/hotels/${id}${params}`}
                    >
                        Details
                    </Link>
                )}
            </div>
        </>
    );
}
