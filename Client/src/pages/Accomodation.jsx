import React from 'react';
import { User, PhoneCall } from 'lucide-react';
import spaceBg from "../assets/images/space-bg.png";

const Accommodation = () => {
    return (
        <div 
            className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-6"
            style={{ backgroundImage: `url(${spaceBg})` }}
        >
            <h1 className="text-5xl font-bold mb-8 text-violet-400 drop-shadow-lg">Accommodation Services</h1>
            
            <div className="bg-black bg-opacity-80 shadow-lg rounded-xl p-8 max-w-lg w-full border border-violet-500">
                <p className="text-lg mb-6 text-blue-300 leading-relaxed">
                    We provide comfortable and affordable accommodation for all participants of our Tech Fest. 
                    Our facilities come with all the necessary amenities to ensure a pleasant stay.
                </p>
                
                <h2 className="text-2xl font-semibold mb-4 text-violet-400">Contact for Accommodation</h2>
                
                <div className="flex items-center mb-4 space-x-3">
                    <User className="text-blue-300" size={24} />
                    <p className="text-lg text-white">Name: John Doe</p>
                </div>
                
                <div className="flex items-center space-x-3">
                    <PhoneCall className="text-blue-300" size={24} />
                    <p className="text-lg text-white">Contact No: +1 234 567 890</p>
                </div>
            </div>
        </div>
    );
};

export default Accommodation;