import { getHotelRatingById } from '@/database/queries';

export default async function HotelRating({ hotelId }) {
    const hotelRating = await getHotelRatingById(hotelId);
    function getRatingDescription(review) {
        if (review === 0) {
            return 'No rating available';
        } else if (review > 1 && review <= 2) {
            return 'poor';
        } else if (review > 2 && review <= 3) {
            return 'average';
        } else if (review > 3 && review <= 4) {
            return 'good';
        } else {
            return 'very good';
        }
    }
    let averageRating = 0;
    const totalReview = hotelRating?.length;
    if (totalReview === 1) {
        averageRating = hotelRating[0].rating;
    } else if (totalReview > 1) {
        averageRating =
            hotelRating.reduce((acc, cur) => {
                acc = acc + cur.rating;
                return acc;
            }, 0) / 2;
    }

    return (
        <>
            <div className="bg-primary w-[35px] h-[35px] rounded-sm text-white grid place-items-center font-bold">
                {averageRating}
            </div>
            <span className="font-medium">
                {getRatingDescription(averageRating)}
            </span>
        </>
    );
}
