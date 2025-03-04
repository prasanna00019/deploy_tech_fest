import * as React from "react";

const Login = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black px-4 font-['Inter']">
            {/* Card Container with Hover Effects */}
            <div className="w-full max-w-md bg-black border border-blue-500 rounded-xl shadow-lg p-8 space-y-6 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-blue-500/50">
                <h2 className="text-3xl font-semibold text-center text-blue-400 tracking-wide uppercase">
                    Welcome Back
                </h2>
                <p className="text-sm text-gray-400 text-center">
                    Please enter your credentials to log in.
                </p>

                <form className="space-y-6">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="w-full mt-1 px-4 py-2 border border-gray-600 bg-transparent text-white rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            className="w-full mt-1 px-4 py-2 border border-gray-600 bg-transparent text-white rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                        />
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center text-sm text-gray-300">
                            <input
                                type="checkbox"
                                className="w-4 h-4 border-gray-500 rounded focus:ring-blue-500"
                            />
                            <span className="ml-2">Remember me</span>
                        </label>
                        <a href="#" className="text-sm text-blue-400 hover:underline">
                            Forgot Password?
                        </a>
                    </div>

                    {/* Custom Black Button with Blue Border and Hover Effect */}
                    <button
                        type="submit"
                        className="w-full py-2 text-lg font-semibold bg-black border-2 border-blue-500 text-blue-400 rounded-lg shadow-lg transition-all duration-300 transform hover:bg-blue-500 hover:text-white hover:shadow-blue-500/50 hover:-translate-y-1"
                    >
                        Sign In
                    </button>
                </form>

                {/* Sign Up Link */}
                <p className="text-center text-sm text-gray-400">
                    Don't have an account?{" "}
                    <a href="/register" className="text-blue-400 hover:underline">
                        Sign up here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
