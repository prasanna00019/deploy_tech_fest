import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HOST } from "@/utils/constants";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import TechSpinner from "@/components/ui/TechSpinner";
import NotificationCard from "@/components/ui/NotificationCard";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);

            const response = await axios.post(`${HOST}/api/auth/login`, formData);
            
            // Store the auth token
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem('userInitials', response.data.userInitials);
            // Navigate to homepage
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black px-4 font-['Inter']">
            {/* Uncomment these lines to add loading and error states */}
            {loading && <TechSpinner />}
            {error && <NotificationCard type={error} message={error} />}

            {/* Card Container with Hover Effects */}
            <div className="w-full max-w-md bg-black border border-blue-500 rounded-xl shadow-lg p-8 space-y-6 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-blue-500/50">
                <h2 className="text-3xl font-semibold text-center text-blue-400 tracking-wide uppercase">
                    Welcome Back
                </h2>
                <p className="text-sm text-gray-400 text-center">
                    Please enter your credentials to log in.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
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
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={handleInputChange}
                                autoComplete="current-password"
                                required
                                className="w-full mt-1 px-4 py-2 border border-gray-600 bg-transparent text-white rounded-lg shadow-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-400 focus:outline-none"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 text-lg font-semibold bg-black border-2 border-blue-500 text-blue-400 rounded-lg shadow-lg transition-all duration-300 transform hover:bg-blue-500 hover:text-white hover:shadow-blue-500/50 hover:-translate-y-1 disabled:opacity-50"
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </Button>
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
