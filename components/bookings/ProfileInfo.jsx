import { auth } from '@/auth';
import Image from 'next/image';

export default async function ProfileInfo() {
    const { user } = (await auth()) || {};
    return (
        <div className="flex flex-col items-center py-8 text-center">
            {user?.image ? (
                <div>
                    <Image
                        src={user?.image}
                        width={100}
                        height={100}
                        alt="profile image"
                        className="rounded-full object-cover object-center"
                    />
                </div>
            ) : (
                <div className="relative max-h-[180px] max-w-[180px] rounded-full lg:mb-8 h-[100px] w-[100px] bg-orange-600 grid place-items-center text-4xl text-white">
                    {user?.name?.slice(0, 1)}
                </div>
            )}

            <div>
                <h3 className="text-2xl font-semibold lg:text-[28px]">
                    {user?.name}
                </h3>
                <p className="leading-[231%] lg:text-lg">{user?.email}</p>
            </div>

            <div className="w-3/4 border-b border-[#a4a4a4] py-6 lg:py-4"></div>
        </div>
    );
}
