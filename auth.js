import { CredentialsSignin } from '@auth/core/errors'; // import is specific to your framework
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import clientPromise from './database/mongoClient';
import { Users } from './models/users-model';
import { connectMongo } from './services/connect-mongo';

class CustomError extends CredentialsSignin {
    code = 'custom';
}
export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    debug: process.env.NODE_ENV !== 'production',
    adapter: MongoDBAdapter(clientPromise, {
        databaseName: process.env.ENVIRONMENT,
    }),
    session: {
        strategy: 'jwt',
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (!credentials) return null;
                const { email, password } = credentials || {};
                try {
                    await connectMongo();
                    const user = await Users.findOne({ email }).lean();
                    if (user) {
                        const isMatchPassword = await bcrypt.compare(
                            password,
                            user?.password || ''
                        );
                        if (isMatchPassword) {
                            return user;
                        } else {
                            throw new Error('Invalid password');
                        }
                    } else {
                        throw new Error('User not found');
                    }
                } catch (err) {
                    throw new CustomError(err.message);
                }
            },
        }),
    ],
});
