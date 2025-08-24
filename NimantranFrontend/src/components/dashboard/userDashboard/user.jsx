
import React, { useState, useEffect } from "react";

import Orders from './orders';
import Addresses from './addresses';
import Account from './account';
import DeliveryBoard from './deliverboard';

function NavItem({ label, id, activeSection, setActiveSection }) {
  const active = activeSection === id;
  return (
    <button
      onClick={() => setActiveSection(id)}
      className={`w-full text-left px-3 py-2 rounded ${active ? ' bg-black text-white dark:hover:bg-gray-900' : ' '}`}
    >
      {label}
    </button>
  );
}

function MobileSidebar() {

  const renderPage = () => {
    switch (activePage) {
      case "account":
        return <div>Account Content</div>;
      case "orders":
        return <div>Orders Content</div>;
      default:
        return <div>Account Content</div>;
    }
  };

  const handleClick = (page) => {
    setActivePage(page);
    setSidebarOpen(false); 
  };

  return (
    <>
      <button
        className="p-2 m-2 text-gray-700 rounded-md md:hidden"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          } md:hidden`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}
      >
        <button
          className="p-2 m-2 text-gray-700 rounded-md"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <ul className="flex flex-col p-4 space-y-2">
          {[ "orders"].map((page) => (
            <li key={page}>
              <button
                onClick={() => handleClick(page)}
                className={`w-full text-left px-3 py-2 rounded ${activePage === page ? "bg-gray-300 font-bold" : "hover:bg-gray-200"
                  }`}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main className="p-4">
        {renderPage()}
      </main>
    </>
  );
}

function OrdersContainer({ orders, handleCancelOrder }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div>
      {!selectedOrder ? (
        <Orders />
      ) : (
     console.log("")
)}
    </div>
  );
}


export default function EcommerceUserDashboard() {
  const [activeSection, setActiveSection] = useState("account");
  const [query, setQuery] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);

  const pageTitles = {
    account: "My Account",
    orders: "My Orders",
    addresses: "My Addresses"
  };

  
  const openDeliveryBoard = (order) => {
    setSelectedOrder(order);
    setActiveSection('deliveryBoard'); 
  };

  const closeDeliveryBoard = () => {
    setSelectedOrder(null);
    setActiveSection('orders');
  };


  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const formatINR = (n) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(n);

  return (

    <div className="min-h-screen dark:bg-gray-900 text-gray-800 dark:text-gray-100 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:py-5">

        <div className="hidden md:block">
          <div className="flex items-center justify-between mb-3 ">
            <h1 className="text-2xl font-semibold">Your Dashboard</h1>
            <div className="flex items-center gap-3">
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-4  md:hidden">
          <div>
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 mb-4"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-gray-300 ">
              {pageTitles[activeSection]}
            </h1>
          </div>
        </div>

        <div
          onClick={() => setMobileSidebarOpen(false)}
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${mobileSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            } lg:hidden`}
        ></div>

        <nav
          className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-black shadow-md z-50 transform transition-transform duration-300
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}
        >
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="p-2 m-2 rounded-md text-gray-700 dark:text-gray-200"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <ul className="flex flex-col p-4 space-y-2">
            {["account", "orders", "addresses"].map((section) => (
              <li key={section}>
                <button
                  onClick={() => {
                    setActiveSection(section);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded ${activeSection === section ? "bg-black text-white font-bold" : "hover:bg-black"
                    }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1 bg-white dark:bg-black rounded-lg p-4 shadow hidden md:block">
            <nav className="space-y-1">
              <NavItem label="Account" id="account" activeSection={activeSection} setActiveSection={setActiveSection} />
              <NavItem label="Orders" id="orders" activeSection={activeSection} setActiveSection={setActiveSection} />
              <NavItem label="Addresses" id="addresses" activeSection={activeSection} setActiveSection={setActiveSection} />
            </nav>

            <div className="mt-6 border-t pt-4 text-xs text-gray-500 dark:text-gray-400">
              Joined: <strong>Jan 2024</strong>
            </div>
          </aside>

          {/* Main content */}
          <main className="lg:col-span-3">
            {activeSection === 'account' && (
              <Account />
            )}
            {activeSection === 'orders' && (
              <Orders  />
            )}
            {activeSection === 'addresses' && (
              <Addresses />
            )}

          </main>
        </div>
      </div>
    </div>
  );


}

export { MobileSidebar };


