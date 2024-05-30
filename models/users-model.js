import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    name: {
        require: true,
        type: String,
    },
    email: {
        require: true,
        type: String,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        ],
    },
    password: {
        require: true,
        type: String,
    },
});

export const Users =
    mongoose.models.Users || mongoose.model('Users', userSchema);
