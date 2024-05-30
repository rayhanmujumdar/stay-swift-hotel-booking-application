import { getReviewForAHotel } from '@/database/queries';
import Link from 'next/link';

export default async function HotelReview({ hotelId }) {
    const reviews = await getReviewForAHotel(hotelId);
    return (
        <>
            {reviews?.length === 0 ? (
                <Link href="#" className="underline">
                    Be the first one to review
                </Link>
            ) : (
                <Link href={`/hotel/${hotelId}/reviews`} className="underline">
                    {reviews.length} Reviews
                </Link>
            )}
        </>
    );
}
