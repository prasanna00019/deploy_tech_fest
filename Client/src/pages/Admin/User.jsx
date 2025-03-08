import React, { useEffect, useState } from "react";
import { HOST } from "@/utils/constants";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${HOST}/api/user/getAllUsers`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Filter users based on search input
  const filteredUsers = users.filter(
    (user) =>
      user.full_name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.toLowerCase().includes(search.toLowerCase()) ||
      user.college_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Users Header */}
      <h1 className="text-3xl font-bold mb-2">Users</h1>
      <p className="text-gray-600 mb-4">View and manage all registered users for your techfest.</p>

      {/* Search and Filter Section */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="border p-2 rounded w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="border p-2 rounded">
          <option>All Status</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow-md rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Profile</th>
              <th className="p-3 text-left">Full Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">College</th>
              <th className="p-3 text-left">Event ID</th>
              <th className="p-3 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={index} className="border-t">
                  <td className="p-3">
                    <img
                      src={user.user_photo_link || "https://static.vecteezy.com/system/resources/thumbnails/019/879/198/small_2x/user-icon-on-transparent-background-free-png.png"}
                      alt={user.full_name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="p-3 font-medium">{user.full_name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.phone}</td>
                  <td className="p-3">{user.college_name}</td>
                  <td className="p-3">{user.participated_event_id}</td>
                  <td className="p-3">{new Date(user.created_at).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
