import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineCloseCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { BiCheck, BiX } from "react-icons/bi";
import { HOST } from "@/utils/constants";

const API_BASE_URL = `${HOST}/api/event`;

const getStatusBadge = (status) => {
  switch (status) {
    case 1:
      return (
        <span className="px-3 py-1 flex items-center gap-2 bg-green-100 text-green-700 font-semibold rounded-full">
          <AiOutlineCheckCircle /> Approved
        </span>
      );
    case 0:
      return (
        <span className="px-3 py-1 flex items-center gap-2 bg-yellow-100 text-yellow-700 font-semibold rounded-full">
          <AiOutlineClockCircle /> Pending
        </span>
      );
    case -1:
      return (
        <span className="px-3 py-1 flex items-center gap-2 bg-red-100 text-red-700 font-semibold rounded-full">
          <AiOutlineCloseCircle /> Rejected
        </span>
      );
    default:
      return (
        <span className="px-3 py-1 bg-gray-200 text-gray-700 font-semibold rounded-full">
          Unknown
        </span>
      );
  }
};

const RegistrationTable = () => {
  const [registrations, setRegistrations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getAllRegistrations`);
      setRegistrations(response.data.data);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
  };

  const updateStatusLocally = (id, newStatus) => {
    setRegistrations((prev) =>
      prev.map((reg) =>
        reg.Registration_ID === id
          ? {
              ...reg,
              Admin_accepted: newStatus,
              Is_Cleared: newStatus === 1 ? false : reg.Is_Cleared,
            }
          : reg
      )
    );
  };

  const handleApprove = async (registration_id, payment_id) => {
    try {
      await axios.put(`${API_BASE_URL}/updateRegistration`, {
        admin_accepted: 1,
        registration_id: registration_id,
        payment_id: payment_id,
      });

      updateStatusLocally(registration_id, 1);
    } catch (error) {
      console.error("Error approving registration:", error);
    }
  };

  const handleReject = async (registration_id, payment_id) => {
    try {
      await axios.put(`${API_BASE_URL}/updateRegistration`, {
        admin_accepted: 0,
        registration_id: registration_id,
        payment_id: payment_id,
      });

      updateStatusLocally(registration_id, 0);
    } catch (error) {
      console.error("Error rejecting registration:", error);
    }
  };

  const filteredRegistrations = registrations.filter((reg) =>
    reg.Registrant_Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8"> 
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Registrations</h1>
      <p className="text-gray-500 text-lg mb-6">
        Manage all event registrations for your techfest.
      </p>

      <div className="flex w-full justify-between items-center mb-4">
        <div className="relative w-1/3">
          <AiOutlineSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full p-3 pl-10 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="w-full bg-white shadow-xl rounded-xl overflow-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-left text-lg">
              <th className="p-4">Event</th>
              <th className="p-4">Team</th>
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status</th>
              <th className="p-4">Transaction ID</th>
              <th className="p-4">Team Photo</th>
              <th className="p-4">Payment Proof</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRegistrations.map((reg) => (
              <tr
                key={reg.Registration_ID}
                className="border-t bg-gray-50 hover:bg-gray-100 transition"
              >
                <td className="p-4 font-semibold text-gray-700">
                  {reg.Event_name}
                </td>
                <td className="p-4 text-gray-600">{reg.Team_Name}</td>
                <td className="p-4 text-gray-600">{reg.Registrant_Name}</td>
                <td className="p-4 text-gray-600">{reg.Registrant_Email}</td>
                <td className="p-4">{getStatusBadge(reg.Admin_accepted)}</td>
                <td className="p-4 text-gray-600">{reg.Transaction_id}</td>
                <td className="p-4">
                  <img
                    src={reg.Team_photoLink}
                    alt="Team"
                    className="h-12 w-12 rounded-md shadow-md"
                  />
                </td>
                <td className="p-4">
                  <a
                    href={reg.Payment_Proof}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Proof
                  </a>
                </td>
                <td className="p-4 flex gap-3">
                  {reg.Admin_accepted === 0 && (
                    <>
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition flex items-center gap-2"
                        onClick={() =>
                          handleApprove(reg.Registration_ID, reg.Payment_ID)
                        }
                      >
                        <BiCheck /> Approve
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegistrationTable;
