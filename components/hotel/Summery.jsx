import HotelSummery from './HotelSummery';

export default function Summery({ hotelInfo, checkIn, checkout }) {
    return (
        <section className="py-4 mt-[100px] ">
            <div className="flex container">
                <HotelSummery
                    formDetails
                    hotelInfo={hotelInfo}
                    checkIn={checkIn}
                    checkout={checkout}
                />
            </div>
        </section>
    );
}
