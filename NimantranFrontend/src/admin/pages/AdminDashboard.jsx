import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    users: 0,
    wholesalers: 0,
    cards: 0,
    orders: 0,
    recentOrders: [],
    loading: true,
    errors: {
      users: null,
      cards: null,
      orders: null
    }
  });

  const fetchStats = async () => {
    try {
      setStats(prev => ({ ...prev, loading: true, errors: {} }));
      
      // Initialize default values
      const results = {
        users: [],
        cards: [],
        orders: []
      };

      // Try to fetch users
      try {
        const usersRes = await axios.get(`${API_BASE_URL}/api/admin/getUsers`, {
          withCredentials: true
        });
          console.log(usersRes)
        results.users = usersRes.data?.data?.users || [];
      } catch (error) {
        console.error("Error fetching users:", error);
        setStats(prev => ({
          ...prev,
          errors: { ...prev.errors, users: "Failed to load users" }
        }));
      }

      // Try to fetch cards (continue even if fails)
      try {
        const cardsRes = await axios.get(`${API_BASE_URL}/api/admin/getAllCards`, {
          withCredentials: true
        });
        results.cards = cardsRes.data?.data || [];
      } catch (error) {
        console.error("Error fetching cards:", error);
        setStats(prev => ({
          ...prev,
          errors: { ...prev.errors, cards: "Failed to load cards" }
        }));
      }

      // Try to fetch orders (continue even if fails)
      try {
        const ordersRes = await axios.get(`${API_BASE_URL}/api/admin/getAllOrders`, {
          withCredentials: true
        });
        results.orders = ordersRes.data?.data || [];
      } catch (error) {
        console.error("Error fetching orders:", error);
        setStats(prev => ({
          ...prev,
          errors: { ...prev.errors, orders: "Failed to load orders" }
        }));
      }

      // Process data we did get
      const totalUsers = results.users.filter( u => u.roles?.includes("user")).length;
      const totalWholesalers = results.users.filter(u => u.wholesalerStatus === 'approved' ) ;
      const recentOrders = results.orders.slice(0, 5);

      setStats({
        users: totalUsers,
        wholesalers: totalWholesalers,
        cards: results.cards.length,
        orders: results.orders.length,
        recentOrders,
        loading: false,
        errors: stats.errors // Keep existing errors
      });

    } catch (error) {
      console.error("Error in fetchStats:", error);
      setStats(prev => ({
        ...prev,
        loading: false,
        errors: {
          users: "Failed to load data",
          cards: "Failed to load data",
          orders: "Failed to load data"
        }
      }));
      toast.error("Failed to load some dashboard data");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const dashboardItems = [
    { 
      title: "Users", 
      count: stats.users, 
      color: "bg-blue-600 hover:bg-blue-700", 
      icon: "👥",
      route: "/admin/users",
      error: stats.errors.users
    },
    { 
      title: "Wholesalers", 
      count: stats.wholesalers, 
      color: "bg-green-600 hover:bg-green-700", 
      icon: "🏢",
      route: "/admin/wholesalers",
      error: stats.errors.users // Same as users since it's derived from same data
    },
    { 
      title: "Cards", 
      count: stats.cards, 
      color: "bg-yellow-500 hover:bg-yellow-600", 
      icon: "🃏",
      route: "/admin/cards",
      error: stats.errors.cards
    },
    { 
      title: "Orders", 
      count: stats.orders, 
      color: "bg-red-600 hover:bg-red-700", 
      icon: "📦",
      route: "/admin/orders",
      error: stats.errors.orders
    },
  ];

  if (stats.loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => !item.error && navigate(item.route)}
            className={`${item.color} text-white rounded-xl p-6 shadow-lg transition ${
              item.error ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:shadow-2xl'
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">{item.title}</h2>
                {item.error ? (
                  <p className="text-sm mt-2">Data unavailable</p>
                ) : (
                  <p className="text-3xl mt-2 font-bold">{item.count.toLocaleString()}</p>
                )}
              </div>
              <span className="text-3xl">{item.icon}</span>
            </div>
            {item.error && (
              <p className="text-xs mt-2 text-white opacity-80">{item.error}</p>
            )}
          </div>
        ))}
      </div>

      {/* Recent Orders Section - Only show if we have orders data */}
      {!stats.errors.orders && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
          {stats.recentOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left">Order ID</th>
                    <th className="py-3 px-4 text-left">Customer</th>
                    <th className="py-3 px-4 text-left">Amount</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map(order => (
                    <tr key={order._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">#{order._id?.slice(-6).toUpperCase() || 'N/A'}</td>
                      <td className="py-3 px-4">{order.userId?.name || 'Guest'}</td>
                      <td className="py-3 px-4">₹{order.totalAmount?.toFixed(2) || '0.00'}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.status === 'completed' ? 'bg-green-100 text-green-800' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status || 'unknown'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No recent orders found</p>
          )}
        </div>
      )}

      {/* Error summary */}
      {(stats.errors.users || stats.errors.cards || stats.errors.orders) && (
        <div className="mt-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4">
          <p className="font-semibold">Some data couldn't be loaded:</p>
          <ul className="list-disc pl-5 mt-2">
            {stats.errors.users && <li>{stats.errors.users}</li>}
            {stats.errors.cards && <li>{stats.errors.cards}</li>}
            {stats.errors.orders && <li>{stats.errors.orders}</li>}
          </ul>
          <button 
            onClick={fetchStats}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;