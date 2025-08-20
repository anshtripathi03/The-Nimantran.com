import React from 'react';
import AddressCard from './AddressCard';
const user = {
  _id: "w9876543210",
  name: "Amit Traders",
  businessName: "Amit Invitation Cards Pvt Ltd",
  gst: "09ABCDE1234F1Z5",
  email: "amit.traders@example.com",
  phone: "+91-9876543211",
  role: "user",
  isWholeseller: true,
  addresses: [
    {
      label: "Main Office",
      street: "Shop No. 12, Sadar Bazar",
      city: "Delhi",
      zip: "110006",
      state: "Delhi",
      country: "India",
    },
    {
      label: "Warehouse",
      street: "Plot 112, Sector 5, Industrial Area",
      city: "Faridabad",
      zip: "121004",
      state: "Haryana",
      country: "India",
    },
  ],
  orders: [
    {
      id: "WHO1234",
      category: "Wedding",
      quantity: 500,
      total: 19990,
      date: "2025-07-22",
      status: "Dispatched",
      items: [
        {
          cardId: "card009",
          title: "Golden Wedding Card (Pack of 100)",
          pricePerUnit: 399,
          quantity: 5,
        },
      ],
    },
    {
      id: "WHO1235",
      category: "Birthday",
      quantity: 200,
      total: 7980,
      date: "2025-07-26",
      status: "Delivered",
      items: [
        {
          cardId: "card015",
          title: "Birthday Invitation (Pack of 100)",
          pricePerUnit: 399,
          quantity: 2,
        },
      ],
    },
  ],
  createdAt: "2025-06-10T12:00:00.000Z",
  isVerified: true,
};
const WholesalerDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Wholesaler Dashboard - {user.businessName}</h2>

      {/* Business Info */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Business Info</h3>
        <p><strong>Owner:</strong> {user.name}</p>
        <p><strong>GST No:</strong> {user.gst}</p>
        <p><strong>Registered Email:</strong> {user.email}</p>
      </div>

      {/* Delivery Addresses */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Delivery Addresses</h3>
        {user.addresses?.length ? (
          user.addresses.map((address, idx) => (
            <AddressCard key={idx} address={address} />
          ))
        ) : (
          <p className="text-gray-500">No delivery addresses</p>
        )}
      </div>

      {/* Wholesale Orders */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Wholesale Orders</h3>
        {user.orders?.length ? (
          user.orders.map((order, idx) => (
            <div key={idx} className="border p-4 rounded-lg shadow bg-white mb-4">
              <div className="mb-2">
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Category:</strong> {order.category}</p>
                <p><strong>Quantity:</strong> {order.quantity}</p>
                <p><strong>Total:</strong> ₹{order.total}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Date:</strong> {order.date}</p>
              </div>

              <div>
                <h4 className="font-medium">Items:</h4>
                <ul className="ml-4 list-disc">
                  {order.items?.map((item, i) => (
                    <li key={i}>
                      <span className="font-semibold">{item.title}</span> — ₹{item.pricePerUnit} × {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Optional: Invoice Button */}
              <div className="mt-3">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                  onClick={() => alert(`Download invoice for order ${order.id}`)}
                >
                  Download Invoice
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No wholesale orders placed yet</p>
        )}
      </div>
    </div>
  );
};

export default WholesalerDashboard;