import RegisterForm from '@/components/auth/RegisterForm';
import SocialLogin from '@/components/auth/SocialLogin';
import Link from 'next/link';

export default function RegisterPage() {
    return (
        <main className="">
            <section className="h-screen grid place-items-center">
                <div className="max-w-[450px] w-full mx-auto p-6 border border-gray-700/20 rounded-md">
                    <h4 className="font-bold text-2xl">Sign up</h4>
                    <RegisterForm />
                    <div className="text-center text-xs text-gray-500 space-x-1">
                        <span>Already have an account?</span>
                        <Link
                            href="/login"
                            className="text-blue-500 hover:text-blue-600"
                        >
                            Login
                        </Link>
                    </div>
                    <div className="text-center text-xs text-gray-500">
                        or Signup with
                    </div>

                    <SocialLogin />
                </div>
            </section>
        </main>
    );
}
