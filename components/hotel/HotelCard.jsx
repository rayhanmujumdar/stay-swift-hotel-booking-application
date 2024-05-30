import Image from 'next/image';
import HotelSummery from './HotelSummery';
export default function HotelCard({ hotel, destination, checkIn, checkout }) {
    const { thumbNailUrl } = hotel;
    return (
        <div className="flex gap-6 border border-gray/20 p-4 rounded-md">
            <Image
                src={thumbNailUrl}
                className="max-h-[162px] max-w-[240px]"
                alt="hotel image"
                width={240}
                height={162}
            />
            <HotelSummery
                hotelInfo={hotel}
                destination={destination}
                checkIn={checkIn}
                checkout={checkout}
            />
        </div>
    );
}
