import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import { toast } from 'react-toastify';

const WholesalerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${API_BASE_URL}/api/admin/applications`, {
        withCredentials: true,
      });
      console.log(data)
      setApplications(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleReview = async (id, status) => {
    if (processing) return;
    
    try {
      setProcessing(true);
      await axios.put(
        `${API_BASE_URL}/api/admin/review/${id}`,
        { status },
        { withCredentials: true }
      );
      
      toast.success(`Application ${status} successfully`);
      await fetchApplications();
    } catch (error) {
      console.error(error);
      toast.error(`Failed to ${status} application`);
    } finally {
      setProcessing(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      declined: "bg-red-100 text-red-800"
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[status] || 'bg-gray-100'}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Wholesaler Applications</h1>
      
      {applications.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No applications found</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Business Name</th>
                <th className="py-3 px-4 text-left">Owner Name</th>
                <th className="py-3 px-4 text-left">Address</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                 
                <tr key={app._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{app.businessName}</td>
                  <td className="py-3 px-4">{app.ownerName}</td>
                  <td className="py-3 px-4">{app.businessAddress}</td>
                  <td className="py-3 px-4">{app.email}</td>
                  <td className="py-3 px-4">{getStatusBadge(app.status)}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      {app.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleReview(app._id, "approved")}
                            disabled={processing}
                            className={`px-3 py-1 rounded text-sm ${
                              processing ? 'bg-gray-300' : 'bg-green-600 hover:bg-green-700'
                            } text-white`}
                          >
                            {processing ? 'Processing...' : 'Approve'}
                          </button>
                          <button
                            onClick={() => handleReview(app._id, "declined")}
                            disabled={processing}
                            className={`px-3 py-1 rounded text-sm ${
                              processing ? 'bg-gray-300' : 'bg-red-600 hover:bg-red-700'
                            } text-white`}
                          >
                            {processing ? 'Processing...' : 'Reject'}
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default WholesalerApplications;