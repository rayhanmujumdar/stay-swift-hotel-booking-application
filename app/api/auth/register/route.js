import { Users } from '@/models/users-model';
import { connectMongo } from '@/services/connect-mongo';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
export const POST = async request => {
    const { fname, lname, email, password } = await request.json();
    try {
        await connectMongo();
        const hashPassword = await bcrypt.hash(
            password,
            Number(process.env.SALT_ROUNDS)
        );
        const newUser = {
            name: `${fname} ${lname}`,
            email,
            password: hashPassword,
        };
        const isExist = await Users.findOne({ email });
        if (isExist) {
            return NextResponse.json(
                { error: 'User already exist' },
                { status: 400 }
            );
        }
        const createdUser = await Users.create(newUser);
        if (!createdUser) {
            return NextResponse.json(
                { error: 'Something was wrong' },
                { status: 500 }
            );
        }
        return new NextResponse('User created successfully', {
            status: 201,
        });
    } catch (err) {
        console.log(err.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
};
