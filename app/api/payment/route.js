import { bookingModel } from '@/models/booking-model';
import { connectMongo } from '@/services/connect-mongo';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
export const POST = async request => {
    const { userId, hotelId, checkin, checkout } = await request.json();
    const payload = {
        userId: new mongoose.Types.ObjectId(userId),
        hotelId: new mongoose.Types.ObjectId(hotelId),
        checkin,
        checkout,
    };
    try {
        await connectMongo();
        await bookingModel.create(payload);
        return new NextResponse('hotel booked successfully', { status: 201 });
    } catch (err) {
        return new NextResponse('something went wrong', { status: 500 });
    }
};
