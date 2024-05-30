import mongoose, { Schema } from "mongoose";
import { ObjectId } from "mongodb";

const bookingSchema = new Schema({
    hotelId: {
        //66263526f50c2e548501f285
        required: true,
        type: ObjectId,
    },
    userId: {
        //6652f6257b86dbb020c0c9d3
        required: true,
        type: ObjectId,
    },
    checkin: {
        required: true,
        type: String,
    },
    checkout: {
        required: true,
        type: String,
    },
});


export const bookingModel = mongoose.models.bookings ?? mongoose.model("bookings", bookingSchema);
