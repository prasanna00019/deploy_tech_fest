import * as React from "react";
import { useState } from "react";
import Select from "react-select"; // Import react-select
import { Button } from "@/components/ui/button";

const Register = () => {
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [selectedCollege, setSelectedCollege] = useState(null);

    const colleges = [
        { value: "IITRAM", label: "IITRAM" },
        { value: "IIT Bombay", label: "IIT Bombay" },
        { value: "IIT Delhi", label: "IIT Delhi" },
        { value: "NIT Surat", label: "NIT Surat" },
        { value: "IIT Madras", label: "IIT Madras" },
        { value: "IIT Kanpur", label: "IIT Kanpur" },
        { value: "BITS Pilani", label: "BITS Pilani" },
        { value: "DAIICT", label: "DAIICT" }
    ];

    const handleOtpChange = (index, value) => {
        if (/^\d?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < 3) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };

    const handleSendOtp = () => setOtpSent(true);

    const handleVerifyOtp = () => {
        if (otp.join("") === "1234") { // Dummy OTP check
            setOtpVerified(true);
        } else {
            alert("Invalid OTP! Try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black px-4 font-['Inter'] overflow-y-auto">
            {/* Card Container */}
            <div className="w-full max-w-md bg-black border border-blue-500 rounded-xl shadow-lg p-8 space-y-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-blue-500/50">
                <h2 className="text-3xl font-semibold text-center text-blue-400 tracking-wide uppercase">
                    Create Account
                </h2>
                <p className="text-sm text-gray-400 text-center">
                    Register now to get started.
                </p>

                <form className="space-y-3">
                    {/* Full Name Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full mt-1 px-4 py-2 border border-gray-600 bg-transparent text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full mt-1 px-4 py-2 border border-gray-600 bg-transparent text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>

                    {/* Phone Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            required
                            className="w-full mt-1 px-4 py-2 border border-gray-600 bg-transparent text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>

                    {/* Searchable College Name Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            College Name
                        </label>
                        <Select
                            options={colleges}
                            value={selectedCollege}
                            onChange={setSelectedCollege}
                            isSearchable
                            placeholder="Search your college..."
                            className="mt-1 text-black"
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    backgroundColor: "black",
                                    borderColor: "gray",
                                    color: "white",
                                }),
                                singleValue: (base) => ({
                                    ...base,
                                    color: "white",
                                }),
                                menu: (base) => ({
                                    ...base,
                                    backgroundColor: "black",
                                    color: "white",
                                }),
                                option: (base, { isFocused }) => ({
                                    ...base,
                                    backgroundColor: isFocused ? "#1e40af" : "black",
                                    color: "white",
                                }),
                            }}
                        />
                    </div>

                    {/* OTP Section */}
                    {!otpVerified && (
                        <>
                            {otpSent ? (
                                <div className="text-center">
                                    <p className="text-sm text-gray-400">Enter OTP sent to your phone</p>
                                    <div className="flex justify-center space-x-2 mt-2">
                                        {otp.map((num, index) => (
                                            <input
                                                key={index}
                                                id={`otp-${index}`}
                                                type="text"
                                                maxLength="1"
                                                value={num}
                                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                                className="w-12 h-12 text-center text-xl font-bold border border-blue-500 bg-transparent text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                            />
                                        ))}
                                    </div>
                                    <Button
                                        onClick={handleVerifyOtp}
                                        className="w-full mt-4 py-2 bg-blue-500 text-white font-semibold rounded-lg transition-all hover:bg-blue-600"
                                    >
                                        Verify OTP
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    onClick={handleSendOtp}
                                    className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg transition-all hover:bg-blue-600"
                                >
                                    Send OTP
                                </Button>
                            )}
                        </>
                    )}

                    {/* Password Fields (Only Show If OTP Verified) */}
                    {otpVerified && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-300">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    className="w-full mt-1 px-4 py-2 border border-gray-600 bg-transparent text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    className="w-full mt-1 px-4 py-2 border border-gray-600 bg-transparent text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>

                            <Button
                                variant="default"
                                size="lg"
                                className="w-full py-2 text-lg font-semibold bg-black border-2 border-blue-500 text-blue-400 rounded-lg shadow-lg transition-all hover:bg-blue-500 hover:text-white hover:shadow-blue-500/50 hover:-translate-y-1"
                            >
                                Sign Up
                            </Button>
                        </>
                    )}
                </form>

                {/* Sign In Link */}
                <p className="text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-400 hover:underline">
                        Sign in here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
