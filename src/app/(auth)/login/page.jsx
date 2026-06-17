"use client";

import Link from "next/link";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import Logo from "@/components/Logo";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { email, password } = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            email,
            password,
        })

        //  console.log("Logging In Data:", { data, error });

        if (error) {
            toast.error(error?.message)
            return;
        } else {
            toast.success(`Welcome ${data?.user?.name}`)
            router.push('/')
        }
    };

    const handleGoogleLogin = () => {
        console.log("Google Auth Triggered");
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 bg-slate-950">
            <div className="w-full max-w-md border border-white/5 bg-slate-900/40 backdrop-blur-xl shadow-2xl rounded-2xl p-6 sm:p-10 transition-all duration-300">

                {/* Header Section */}
                <div className="flex flex-col gap-1 items-center pb-6 text-center">
                    <Logo />
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-pink-500 bg-clip-text text-transparent mt-3">
                        Welcome Back
                    </h1>
                    <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xs sm:max-w-none">
                        Access your Ticketo account and purchase event tickets.
                    </p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="space-y-4 w-full">

                    {/* Email Address */}
                    <div className="form-control w-full">
                        <label className="label py-1" htmlFor="email">
                            <span className="label-text text-slate-300 text-xs sm:text-sm font-medium">Email Address</span>
                        </label>
                        <div className="relative flex items-center">
                            <FaEnvelope className="absolute left-4 text-slate-400 text-sm pointer-events-none" />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="john@example.com"
                                required
                                autoComplete="email"
                                className="input input-bordered h-11 sm:h-12 w-full pl-11 bg-slate-950/50 border-white/10 text-white text-sm focus:border-pink-500 focus:outline-none placeholder:text-slate-500"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="form-control w-full">
                        <label className="label py-1" htmlFor="password">
                            <span className="label-text text-slate-300 text-xs sm:text-sm font-medium">Password</span>
                        </label>
                        <div className="relative flex items-center">
                            <FaLock className="absolute left-4 text-slate-400 text-sm pointer-events-none" />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                autoComplete="current-password"
                                className="input input-bordered h-11 sm:h-12 w-full pl-11 bg-slate-950/50 border-white/10 text-white text-sm focus:border-pink-500 focus:outline-none placeholder:text-slate-500"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn w-full bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 text-white font-bold border-none normal-case h-11 sm:h-12 shadow-lg shadow-pink-500/10 mt-4 text-sm"
                    >
                        Sign In
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-5">
                    <div className="flex-grow border-t border-white/5" />
                    <span className="mx-4 text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider whitespace-nowrap">Or Login With</span>
                    <div className="flex-grow border-t border-white/5" />
                </div>

                {/* Google OAuth Button */}
                <button
                    onClick={handleGoogleLogin}
                    type="button"
                    className="btn btn-bordered w-full bg-transparent border border-white/10 text-white hover:bg-white/5 hover:border-white/20 normal-case font-semibold h-11 gap-2 text-sm"
                >
                    <FaGoogle className="text-pink-500" />
                    Google Account
                </button>

                {/* Bottom Link */}
                <p className="text-center text-xs sm:text-sm text-slate-400 mt-6">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-pink-500 hover:text-pink-400 font-semibold hover:underline transition-colors">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}