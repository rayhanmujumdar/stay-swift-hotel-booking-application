import { auth } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';
import stayswift_logo from '../public/assets/stayswift.svg';
import SignOut from './auth/SignOut';
export default async function Navbar({ sideMenu }) {
    const { user } = (await auth()) || {};
    return (
        <nav>
            <Link href="/">
                <Image src={stayswift_logo} alt="Stay Swift Logo" srcSet="" />
            </Link>
            {sideMenu && (
                <ul>
                    <li>
                        <a href="#">Recommended Places</a>
                    </li>

                    <li>
                        <a href="#">About Us</a>
                    </li>

                    <li>
                        <a href="#">Contact us</a>
                    </li>

                    <li>
                        <Link href="/bookings">Bookings</Link>
                    </li>

                    {!user ? (
                        <li>
                            <Link href="/login" className="login">
                                Login
                            </Link>
                        </li>
                    ) : (
                        <li>
                            <span className="mx-1">{user?.name}</span>
                            <span> | </span>

                            <SignOut />
                        </li>
                    )}
                </ul>
            )}
        </nav>
    );
}
