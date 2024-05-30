import mongoose, { Schema } from 'mongoose';

const hotelSchema = new Schema({
    name: String,
    address1: String,
    airportCode: String,
    city: String,
    countryCode: String,
    highRate: Number,
    location: new Schema({
        latitude: Number,
        longitude: Number,
    }),
    locationDescription: String,
    lowRate: Number,
    postalCode: Number,
    propertyCategory: Number,
    shortDescription: String,
    stateProvinceCode: String,
    thumbNailUrl: String,
    gallery: [String],
    overview: String,
    amenities: Array,
});

export const hotelsModel = mongoose.models.Hotels || mongoose.model('Hotels', hotelSchema);
