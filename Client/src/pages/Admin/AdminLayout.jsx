import React, { useState } from "react";
import axios from "axios";
import { HOST } from "@/utils/constants";
import Sidebar from "./side";
import Dashboard from "./Dashboard";
import CreateEvent from "./CreateEvents";
import Events from "./Events";
import Feedback from "./Feedback";
import RegistrationTable from "./Registration";
import Users from "./User";
import TechSpinner from "@/components/ui/TechSpinner";
import NotificationCard from "@/components/ui/NotificationCard";

const AdminLayout = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [adminPassword, setAdminPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${HOST}/api/auth/verify-admin-password`, {
        password: adminPassword
      });

      if (response.data.success) {
        setIsVerified(true);
        setAdminPassword("");
      } else {
        setError("Invalid admin password");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <Dashboard />;
      case "create-event":
        return <CreateEvent />;
      case "events":
        return <Events />;
      case "feedback":
        return <Feedback />;
      case "registrations":
        return <RegistrationTable />;
      case "users":
        return <Users />;
      default:
        return <Dashboard />;
    }
  };

  if (!isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[rgb(10,1,24)] to-purple-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl backdrop-blur-sm">
              <TechSpinner />
            </div>
          )}
          
          {error && (
            <div className="mb-4">
              <NotificationCard type="error" message={error} />
            </div>
          )}
          
          <form onSubmit={handleVerify} className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-xl border border-purple-500/20">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Admin Access</h2>
            <div className="space-y-4">
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-2 bg-black/50 border border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none text-white"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all duration-300 disabled:opacity-50 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? "Verifying..." : "Access Admin Panel"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Fixed Sidebar */}
      <div>
        <Sidebar 
          onComponentChange={setActiveComponent}
          activeComponent={activeComponent}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="bg-white rounded-xl shadow-sm p-8 min-h-[calc(100vh-4rem)]">
            {renderComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;