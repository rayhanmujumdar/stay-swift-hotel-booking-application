import mongoose from 'mongoose';

const cache = {};
const mongoUri = String(process.env.MONGODB_URI);
export const connectMongo = async () => {
    if (!mongoUri) {
        throw new Error('MONGO_URI is not defined');
    }
    if (cache.connection) return cache.connection;
    if (!cache.promise) {
        const options = {};
        cache.promise = mongoose.connect(mongoUri, options);
    }
    try {
        cache.connection = await cache.promise;
        return cache.connection;
    } catch (err) {
        cache.promise = undefined;
        throw err;
    }
};
