import { bookingModel } from '@/models/booking-model';
import { hotelsModel } from '@/models/hotels-model';
import { ratingModel } from '@/models/rating-model';
import { reviewModel } from '@/models/review-model';
import { Users } from '@/models/users-model';
import {
    isBookedHotelRoom,
    replaceMongoIdInArray,
    replaceMongoIdInObject,
} from '@/utils/data-utils';

export const getAllHotels = async (
    destination,
    checkIn,
    checkout,
    categories
) => {
    try {
        const regex = new RegExp(destination, 'i');
        const hotels = await hotelsModel
            .find({ city: { $regex: regex } })
            .select([
                'name',
                'city',
                'highRate',
                'lowRate',
                'thumbNailUrl',
                'propertyCategory',
            ])
            .lean();
        let allHotels = hotels;
        if (categories) {
            const splitCategories = categories.split('|');
            allHotels = allHotels.filter(hotel => {
                return splitCategories.includes(String(hotel.propertyCategory));
            });
        }
        if (checkIn && checkout) {
            allHotels = await Promise.all(
                allHotels.map(async hotel => {
                    const found = await findBooking(
                        hotel._id,
                        checkIn,
                        checkout
                    );
                    if (found) {
                        hotel['isBooked'] = true;
                    } else {
                        hotel['isBooked'] = false;
                    }
                    return hotel;
                })
            );
        }
        return replaceMongoIdInArray(allHotels);
    } catch (error) {
        console.log(error);
    }
};

const findBooking = async (hotelId, checkIn, checkout) => {
    try {
        const booking = await bookingModel
            .find({ hotelId: hotelId.toString() })
            .lean();
        const found = booking.find(match => {
            return (
                isBookedHotelRoom(checkIn, match.checkin, match.checkout) ||
                isBookedHotelRoom(checkout, match.checkin, match.checkout)
            );
        });
        return found;
    } catch (err) {
        throw err;
    }
};

export const getHotelById = async (id, checkIn, checkout) => {
    try {
        const hotel = await hotelsModel.findById(id).lean();
        const found = await findBooking(hotel?._id, checkIn, checkout);
        if (found) {
            hotel.isBooked = true;
        } else {
            hotel.isBooked = false;
        }
        return replaceMongoIdInObject(hotel);
    } catch (err) {
        console.log(err);
    }
};

export const getReviewForAHotel = async hotelId => {
    try {
        const reviews = await reviewModel.find({ hotelId }).lean();
        return replaceMongoIdInArray(reviews);
    } catch (err) {
        console.log(err);
    }
};

export const getHotelRatingById = async hotelId => {
    try {
        const rating = await ratingModel.find({ hotelId }).lean();
        return replaceMongoIdInArray(rating);
    } catch (err) {
        console.log(err);
    }
};

export const getUserByEmail = async email => {
    try {
        const userInfo = await Users.findOne({ email }).lean();
        return replaceMongoIdInObject(userInfo);
    } catch (err) {
        console.log(err);
    }
};
export const getBookingsByUserId = async userId => {
    try {
        const bookings = await bookingModel.find({ userId }).lean();
        return replaceMongoIdInArray(bookings);
    } catch (err) {
        console.log(err);
    }
};
