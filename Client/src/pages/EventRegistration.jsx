import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { HOST } from "@/utils/constants";
import { Button } from "@/components/ui/button";
import QRcode from "../assets/images/qr-code.jpg";
import TechSpinner from "@/components/ui/TechSpinner";
import NotificationCard from "@/components/ui/NotificationCard";
import { ArrowLeft } from "lucide-react";

const EventRegistration = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);
  const [formData, setFormData] = useState({
    teamName: "",
    participants: [""],
    transactionId: "",
    paymentScreenshot: null,
  });

  // Fetch event details
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `${HOST}/api/event/get-event-by-id/${eventId}`
        );
        setEventDetails(response.data.event);
      } catch (error) {
        setError("Failed to fetch event details");
        navigate("/events");
      }
    };
    fetchEventDetails();
  }, [eventId]);

  if (!eventDetails) {
    return <TechSpinner />;
  }

  const maxTeamSize = parseInt(eventDetails.MaxTeam_Size) || 1;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      // 2MB limit
      setFormData((prev) => ({
        ...prev,
        paymentScreenshot: file,
      }));
    } else {
      setError("File size should be less than 5MB");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imageUrl = "";

      // First, upload the payment screenshot
      if (!formData.paymentScreenshot) {
        setError("Payment screenshot is required");
        return;
      }

      // Create FormData for image upload
      const imageFormData = new FormData();
      imageFormData.append("image", formData.paymentScreenshot);

      // Upload the image
      const uploadResponse = await axios.post(
        `${HOST}/upload/`,
        imageFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (!uploadResponse.data.fileUrl) {
        throw new Error("Failed to upload image");
      }

      // Remove localhost:5000 from the URL and replace with HOST
      imageUrl = uploadResponse.data.fileUrl.replace('https://deploy-tech-fest.onrender.com', HOST);

      // Create the payload object with the image URL
      const payload = {
        event_id: eventDetails.Event_ID,
        participants: formData.participants,
        team_name: maxTeamSize > 1 ? formData.teamName : "",
        team_photolink: imageUrl, // Use the uploaded image URL
        transaction_id: formData.transactionId,
        amount: eventDetails.Event_fees,
      };

      // Send the registration request
      const response = await axios.post(`${HOST}/api/event/register`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (response.data.success) {
        setSuccess(
          "Registration successful! You/Your team has been registered for this event. For Teams, Only the team leader needs to register for the team."
        );
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error("Registration error:", error.response.data.error);
      setError(error.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const validateStep1 = () => {
    if (maxTeamSize > 1 && !formData.teamName.trim()) {
      setError("Team name is required");
      return false;
    }

    const validParticipants = formData.participants.every((email) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    );

    if (!validParticipants) {
      setError("Please enter valid email addresses for all participants");
      return false;
    }

    return true;
  };

  const SuccessModal = ({ message, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-r from-purple-900/80 to-blue-900/80 rounded-lg p-6 max-w-md w-full mx-4 border border-purple-500/20"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Registration Successful!
            </h3>
            <p className="text-gray-300 mb-6">{message}</p>
            <Button
              onClick={onClose}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              OK
            </Button>
          </div>
        </motion.div>
      </div>
    );
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate("/events", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[rgb(10,1,24)] text-white py-16 px-4">
      {loading && <TechSpinner />}
      {error && <NotificationCard type={error} message={error} />}
      {showSuccessModal && (
        <SuccessModal message={success} onClose={handleModalClose} />
      )}

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-8 backdrop-blur-lg border border-purple-500/20"
        >
          {/* Event Header */}
          <div className="text-center mb-8">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate(-1)}
              className="fixed top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </motion.button>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              {eventDetails.Event_name}
            </h1>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">{eventDetails.Event_description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-purple-400">📅 Timeline:</span>
                  <span>{eventDetails.Event_timeline}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-purple-400">📍 Location:</span>
                  <span>{eventDetails.Event_location}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-purple-400">💰 Registration Fee:</span>
                  <span>₹{eventDetails.Event_fees}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-purple-400">⏰ Deadline:</span>
                  <span>{eventDetails.Event_registration_deadline}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Steps */}
          {/* ... existing steps code ... */}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Team Details */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                {parseInt(eventDetails.MaxTeam_Size) > 1 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Team Name
                    </label>
                    <input
                      type="text"
                      value={formData.teamName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          teamName: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 bg-black/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-white"
                      placeholder="Enter your team name"
                      required
                    />
                  </div>
                )}

                {/* Participant Fields */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-purple-400">
                    {parseInt(eventDetails.MaxTeam_Size) > 1
                      ? "Team Members Details (Make sure all team members are registered on this site)"
                      : "Participant Details"}{" "}
                  </h3>
                  {Array.from({
                    length: parseInt(eventDetails.MaxTeam_Size),
                  }).map((_, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {parseInt(eventDetails.MaxTeam_Size) > 1
                          ? `Member ${index + 1}`
                          : "Your"}{" "}
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.participants[index] || ""}
                        onChange={(e) => {
                          const newParticipants = [...formData.participants];
                          newParticipants[index] = e.target.value;
                          setFormData((prev) => ({
                            ...prev,
                            participants: newParticipants,
                          }));
                        }}
                        className="w-full px-4 py-2 bg-black/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-white"
                        placeholder="Enter email address"
                        required
                      />
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  onClick={() => {
                    if (validateStep1()) setStep(2);
                  }}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Next: Payment Details
                </Button>
              </motion.div>
            )}

            {/* Step 2: Payment Details */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="text-center p-6 bg-black/30 rounded-xl border border-purple-500/20">
                  <h3 className="text-lg font-medium text-purple-400 mb-4">
                    Payment Information
                  </h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Amount to pay: ₹{eventDetails.Event_fees}
                  </p>
                  <img
                    src={QRcode}
                    alt="Payment QR Code"
                    className="mx-auto w-48 h-48 mb-4"
                  />
                  <p className="text-sm text-gray-400">
                    INSTITUTE OF INFRASTRUCTURE TECHNOLOGY RESEARCH AND
                    MANAGEMENT
                  </p>
                  <p className="text-sm text-gray-400">Scan QR code to pay</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Transaction ID
                    </label>
                    <input
                      type="text"
                      value={formData.transactionId}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          transactionId: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-2 bg-black/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-white"
                      placeholder="Enter transaction ID"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Payment Screenshot (Max 2MB)
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full px-4 py-2 bg-black/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-white"
                      required
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    onClick={() => setStep(1)}
                    variant="outline"
                    className="w-1/2 text-black hover:bg-slate-200"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-1/2 bg-purple-600 hover:bg-purple-700"
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <TechSpinner />
                        Registering...
                      </span>
                    ) : (
                      "Complete Registration"
                    )}
                  </Button>
                </div>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default EventRegistration;
