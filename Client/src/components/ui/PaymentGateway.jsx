import React, { useState } from "react";
import { FaQrcode, FaFileUpload, FaCheckCircle } from "react-icons/fa";
import spaceBg from "../assets/images/space-bg.png";
import QRcode from "../assets/images/qr_code.jpg"
const PaymentGateway = () => {
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setScreenshot(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Payment details submitted successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center text-gray-300 px-6 py-10" style={{ backgroundImage: `url(${spaceBg})` }}>
      <h2 className="text-violet-500 text-3xl font-extrabold tracking-wide mb-6">Tech Fest Payment</h2>
      
      {/* QR Code */}
      <div className="bg-violet-500 p-4 rounded-lg shadow-lg flex flex-col items-center">
       
        <img 
          src={QRcode}
          alt="QR Code" 
          className="w-48 h-48 object-contain mx-auto"
        />
      </div>
      
      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="mt-6 w-full max-w-md">
        <label className="block text-violet-400 text-sm font-semibold mb-2">Transaction ID</label>
        <div className="flex items-center bg-black border border-violet-600 rounded-lg p-3">
          <input 
            type="text" 
            value={transactionId} 
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="Enter Transaction ID" 
            className="w-full bg-transparent text-white focus:outline-none"
            required
          />
          <FaCheckCircle className="text-violet-400 ml-2" />
        </div>
        
        <label className="block text-violet-400 text-sm font-semibold mt-4 mb-2">Upload Screenshot</label>
        <div className="flex items-center bg-black border border-violet-600 rounded-lg p-3">
          <input 
            type="file" 
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-white focus:outline-none"
            required
          />
          <FaFileUpload className="text-violet-400 ml-2" />
        </div>

        {screenshot && (
          <div className="mt-4">
            <img src={screenshot} alt="Screenshot Preview" className="w-full h-40 object-cover rounded-lg border border-violet-500" />
          </div>
        )}

        <button type="submit" className="mt-6 w-full bg-black hover:bg-gray-900 text-white font-bold py-3 rounded-lg shadow-md transition-all flex items-center justify-center">
          Submit Payment Details
        </button>
      </form>
    </div>
  );
};

export default PaymentGateway;