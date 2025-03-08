import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { HOST } from "@/utils/constants";
import TechSpinner from "@/components/ui/TechSpinner";
import NotificationCard from "@/components/ui/NotificationCard";
// import ErrorModal from "@/components/ui/ErrorModal";
// import LoadingSpinner from "@/components/ui/LoadingSpinner";

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [selectedCollege, setSelectedCollege] = useState(null);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleOtpChange = (index, value) => {
        if (/^\d?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            if (value && index < 5) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };

    const handleSendOtp = async () => {
        try {
            setLoading(true);
            await axios.post(`${HOST}/api/auth/send-otp`, {
                email: formData.email,
                phone: formData.phone
            });
            setOtpSent(true);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            setLoading(true);
            const enteredOtp = otp.join("");
            await axios.post(`${HOST}/api/auth/verify-otp`, {
                email: formData.email,
                otp: enteredOtp
            });
            setOtpVerified(true);
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            const userName = formData.email.split('@')[0];
            
            const registerData = {
                userName,
                password: formData.password,
                fullName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                collegeName: selectedCollege?.value || "",
                userPhotoLink: "",
                participatedEventId: []
            };

            await axios.post(`${HOST}/api/auth/register`, registerData);
            setError(null);
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black px-4 font-['Inter'] overflow-y-auto">
            {loading && <TechSpinner />}
            {error && <NotificationCard type={error} message={error} />}

            <div className="w-full max-w-md bg-black border border-blue-500 rounded-xl shadow-lg p-8 space-y-4 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-blue-500/50">
                <h2 className="text-3xl font-semibold text-center text-blue-400 tracking-wide uppercase">
                    Create Account
                </h2>
                <p className="text-sm text-gray-400 text-center">
                    Register now to get started.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            required
                            className="w-full mt-1 px-4 py-2 border border-gray-600 bg-transparent text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full mt-1 px-4 py-2 border border-gray-600 bg-transparent text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full mt-1 px-4 py-2 border border-gray-600 bg-transparent text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                    </div>

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

                    {!otpVerified && (
                        <>
                            {otpSent ? (
                                <div className="text-center">
                                    <p className="text-sm text-gray-400">Enter OTP sent to your Email</p>
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
                                        type="button"
                                        onClick={handleVerifyOtp}
                                        disabled={loading || otp.join("").length !== 6}
                                        className="w-full mt-4 py-2 bg-blue-500 text-white font-semibold rounded-lg transition-all hover:bg-blue-600 disabled:opacity-50"
                                    >
                                        Verify OTP
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    type="button"
                                    onClick={handleSendOtp}
                                    disabled={loading || !formData.email || !formData.phone}
                                    className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg transition-all hover:bg-blue-600 disabled:opacity-50"
                                >
                                    Send OTP
                                </Button>
                            )}
                        </>
                    )}

                    {otpVerified && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-300">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
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
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full mt-1 px-4 py-2 border border-gray-600 bg-transparent text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full py-2 text-lg font-semibold bg-black border-2 border-blue-500 text-blue-400 rounded-lg shadow-lg transition-all hover:bg-blue-500 hover:text-white hover:shadow-blue-500/50 hover:-translate-y-1 disabled:opacity-50"
                            >
                                Sign Up
                            </Button>
                        </>
                    )}
                </form>

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