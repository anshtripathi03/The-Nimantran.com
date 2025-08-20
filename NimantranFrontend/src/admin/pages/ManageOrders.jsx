import React, { useEffect, useState } from "react";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await get("/admin/getAllOrders");
      setOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (id, field, value) => {
    try {
      const endpoint = field === "order" ? "updateOrderStatus" : "updatePaymentStatus";
      await put(`/admin/${endpoint}/${id}`, { status: value });
      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this order?")) return;
    try {
      await del(`/admin/deleteOrder/${id}`);
      setOrders(orders.filter(o => o._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4">Order ID</th>
              <th className="py-2 px-4">User</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Payment</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id} className="border-b">
                <td className="py-2 px-4">{order._id}</td>
                <td className="py-2 px-4">{order.user|| order.userEmail}</td>
                <td className="py-2 px-4">
                  <select
                    value={order.status}
                    onChange={e => handleStatusUpdate(order._id, "order", e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
                <td className="py-2 px-4">
                  <select
                    value={order.paymentStatus}
                    onChange={e => handleStatusUpdate(order._id, "payment", e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Failed">Failed</option>
                  </select>
                </td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
