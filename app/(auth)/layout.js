import Navbar from '@/components/Navbar';
import { connectMongo } from '@/services/connect-mongo';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'stay-swift',
    description: 'Generated by create next app',
};

export default async function RootLayout({ children }) {
    await connectMongo();
    return (
        <html lang="en">
            <body className={inter.className}>
                <Navbar />
                {children}
            </body>
        </html>
    );
}
