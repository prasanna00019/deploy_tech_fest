import React, { useState } from "react";
import axios from "axios";
import { HOST } from "@/utils/constants";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    Event_name: "",
    Event_description: "",
    Event_timeline: "",
    Event_rules: "",
    Event_photo_link: "",
    Event_location: "",
    MaxTeam_Size: "",
    Event_fees: "",
    Event_coordinator_description: "",
    Event_registration_deadline: "",
  });

  const [imageFile, setImageFile] = useState(null); // State to store the image file
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]); // Store the selected image file
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      let imageUrl = "";

      // If an image is selected, upload it first
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append("image", imageFile);

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
        imageUrl = uploadResponse.data.fileUrl.replace('http://localhost:5000', HOST);
      }

      // Create the event payload with the image URL
      const payload = {
        ...eventData,
        Event_photo_link: imageUrl, // Use the uploaded image URL
      };

      // Send the event creation request
      const response = await axios.post(
        `${HOST}/api/event/create-event`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status === 201) {
        setMessage("🎉 Event created successfully!");
        setEventData({
          Event_name: "",
          Event_description: "",
          Event_timeline: "",
          Event_rules: "",
          Event_photo_link: "",
          Event_location: "",
          MaxTeam_Size: "",
          Event_fees: "",
          Event_coordinator_description: "",
          Event_registration_deadline: "",
        });
        setImageFile(null); // Reset the image file
      } else {
        setMessage(response.data.error || "⚠️ Failed to create event.");
      }
    } catch (error) {
      setMessage("❌ Error: Unable to connect to the server.");
      console.error("Error:", error);
    }

    setLoading(false);
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create an Event
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="Event_name"
            value={eventData.Event_name}
            onChange={handleChange}
            placeholder="Event Name"
            className="p-3 border rounded-md w-full"
          />

          <input
            type="text"
            name="Event_location"
            value={eventData.Event_location}
            onChange={handleChange}
            placeholder="Event Location"
            className="p-3 border rounded-md w-full"
          />

          <input
            type="text"
            name="Event_timeline"
            value={eventData.Event_timeline}
            onChange={handleChange}
            placeholder="Event Timeline (e.g. March 20-21, 2024)"
            className="p-3 border rounded-md w-full"
          />

          <input
            type="file"
            name="Event_photo_link"
            onChange={handleImageChange}
            className="p-3 border rounded-md w-full"
          />

          <input
            type="number"
            name="MaxTeam_Size"
            value={eventData.MaxTeam_Size}
            onChange={handleChange}
            placeholder="Max Team Size"
            className="p-3 border rounded-md w-full"
          />

          <input
            type="number"
            name="Event_fees"
            value={eventData.Event_fees}
            onChange={handleChange}
            placeholder="Entry Fee (₹)"
            className="p-3 border rounded-md w-full"
          />

          <input
            type="text"
            name="Event_registration_deadline"
            value={eventData.Event_registration_deadline}
            onChange={handleChange}
            placeholder="Registration Deadline"
            className="p-3 border rounded-md w-full"
          />
        </div>

        <textarea
          name="Event_description"
          value={eventData.Event_description}
          onChange={handleChange}
          placeholder="Event Description"
          className="p-3 border rounded-md w-full mt-4 h-24"
        ></textarea>

        <textarea
          name="Event_rules"
          value={eventData.Event_rules}
          onChange={handleChange}
          placeholder="Event Rules"
          className="p-3 border rounded-md w-full mt-4 h-24"
        ></textarea>

        <textarea
          name="Event_coordinator_description"
          value={eventData.Event_coordinator_description}
          onChange={handleChange}
          placeholder="Coordinator Contact Details"
          className="p-3 border rounded-md w-full mt-4 h-24"
        ></textarea>

        <button
          onClick={handleSubmit}
          className={`w-full mt-6 p-3 text-white font-bold rounded-md transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Create Event"}
        </button>

        {message && (
          <p className="mt-4 text-center text-gray-800 font-semibold">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateEvent;
