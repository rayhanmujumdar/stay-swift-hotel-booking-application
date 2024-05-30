import LoginForm from '@/components/auth/LoginForm';
import SocialLogin from '@/components/auth/SocialLogin';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <main className="">
            <section className="h-screen grid place-items-center">
                <div className="max-w-[450px] w-full mx-auto p-6 border border-gray-700/20 rounded-md">
                    <h4 className="font-bold text-2xl">Sign in</h4>
                    <LoginForm />

                    <div className="text-center text-xs text-gray-500 space-x-1">
                        <span>Don't have an account?</span>
                        <Link href="/register" className="text-blue-500">
                            Signup
                        </Link>
                    </div>
                    <div className="text-center text-xs text-gray-500">
                        or Signup with
                    </div>
                    {/* social login component */}
                    <SocialLogin />
                </div>
            </section>
        </main>
    );
}
