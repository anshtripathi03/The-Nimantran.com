import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { toast } from 'react-toastify'; // Install with: npm install react-toastify

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/admin/getUsers`, {
        params: { page, limit: 10 },
        withCredentials: true
      });
      setUsers(res.data?.data?.users || []);
      setTotalPages(res.data?.data?.pagination?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleBanUser = async (userId, isCurrentlyBanned) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/api/admin/users/${userId}/ban`,
        { isBanned: !isCurrentlyBanned },
        { withCredentials: true }
      );
      toast.success(`User ${isCurrentlyBanned ? 'unbanned' : 'banned'} successfully`);
      fetchUsers(currentPage);
    } catch (error) {
      console.error("Error updating ban status:", error);
      toast.error("Failed to update user status");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
      await axios.delete(
        `${API_BASE_URL}/api/admin/users/${userId}`,
        { withCredentials: true }
      );
      toast.success("User deleted successfully");
      fetchUsers(currentPage);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  const handleWholesalerAction = async (userId, action) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/api/admin/users/${userId}/wholesaler-status`,
        { status: action },
        { withCredentials: true }
      );
      toast.success(`Wholesaler status updated to ${action}`);
      fetchUsers(currentPage);
    } catch (error) {
      console.error("Error updating wholesaler status:", error);
      toast.error("Failed to update wholesaler status");
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Users & Wholesalers</h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Phone</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Wholesaler</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{u.name}</td>
                    <td className="py-3 px-4">{u.email}</td>
                    <td className="py-3 px-4">{u.phone}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        u.isBanned ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {u.isBanned ? 'Banned' : 'Active'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          u.wholesalerStatus === 'approved' ? 'bg-green-100 text-green-800' :
                          u.wholesalerStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          u.wholesalerStatus === 'declined' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {u.wholesalerStatus || 'none'}
                        </span>
                        {u.wholesalerStatus === 'pending' && (
                          <div className="flex space-x-1">
                            <button 
                              onClick={() => handleWholesalerAction(u._id, 'approved')}
                              className="text-xs bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded"
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => handleWholesalerAction(u._id, 'declined')}
                              className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                            >
                              Decline
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleBanUser(u._id, u.isBanned)}
                          className={`text-xs px-3 py-1 rounded ${
                            u.isBanned 
                              ? 'bg-green-500 hover:bg-green-600 text-white'
                              : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                          }`}
                        >
                          {u.isBanned ? 'Unban' : 'Ban'}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <nav className="inline-flex rounded-md shadow">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 border-t border-b border-gray-300 ${
                      currentPage === page 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Users;