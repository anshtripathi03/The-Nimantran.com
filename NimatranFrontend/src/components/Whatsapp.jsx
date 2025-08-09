// WhatsAppButton.jsx
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  return (
    <a
      href="https://web.whatsapp.com/send?phone=919876543210&text=Hello%2C%20I%20need%20help%20regarding%20your%20services
" // Replace with your number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition duration-300 ease-in-out"
    >
      <FaWhatsapp size={28} />
    </a>
  );
};

export default WhatsAppButton;
