import React, { useEffect, useState } from "react";
import { HOST } from "@/utils/constants";

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch(`${HOST}/api/feedback/getFeedback`)
      .then((response) => response.json())
      .then((data) => setFeedbacks(data))
      .catch((error) => console.error("Error fetching feedback:", error));
  }, []);

  return (
    <div className="ml-72 p-6 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Feedback</h1>
      <p className="text-gray-600 mb-6 text-lg">Read what participants have to say about our events.</p>

      <div className="w-full max-w-5xl">
        {feedbacks.length > 0 ? (
          feedbacks.map((feedback) => (
            <div
              key={feedback.Feedback_ID}
              className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-xl p-6 mb-6 border border-gray-200"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold text-gray-900">User ID: {feedback.user_ID}</h2>
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Rating: {feedback.Rating} ★
                </span>
              </div>

              <p className="text-gray-700 text-lg mb-3">{feedback.Feedback_desc}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-lg">No feedback available.</p>
        )}
      </div>
    </div>
  );
};

export default FeedbackList;
