import React, { useState } from "react";

const PaymentOptions = ({ paymentMethod, setPaymentMethod }) => {
  const [upiApp, setUpiApp] = useState("");
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
  });
  const [selectedBank, setSelectedBank] = useState("");

  return (
    <div className="mb-10">
      <h2 className="text-lg md:text-xl font-bold text-[#6A4E3A] mb-4">2️⃣ Payment Method</h2>

      {/* Payment Method Selection */}
      <div className="grid md:grid-cols-2 gap-4 font-serif">
        {["UPI", "Credit/Debit Card", "Net Banking"].map((method) => (
          <label
            key={method}
            className={`border rounded-xl p-4 cursor-pointer transition-all shadow-sm ${
              paymentMethod === method
                ? "border-[#FFD700] bg-yellow-50 scale-[1.02] shadow"
                : "border-gray-300 hover:border-[#FFD700]"
            }`}
          >
            <input
              type="radio"
              name="payment"
              value={method}
              className="mr-2"
              checked={paymentMethod === method}
              onChange={() => setPaymentMethod(method)}
            />
            <span className="text-lg text-[#6A4E3A]">{method}</span>
          </label>
        ))}
      </div>

      {/* UPI Section */}
      {paymentMethod === "UPI" && (
        <div className="mt-6 bg-[#fff8dc] border border-yellow-300 rounded-xl p-5 font-serif">
          <p className="font-semibold text-sm mb-3 text-[#6A4E3A]">Select UPI App:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            {["Google Pay", "PhonePe", "Paytm", "Enter UPI ID manually"].map((app) => (
              <label key={app} className="cursor-pointer">
                <input
                  type="radio"
                  name="upiApp"
                  value={app}
                  checked={upiApp === app}
                  onChange={() => setUpiApp(app)}
                  className="mr-2"
                />
                {app}
              </label>
            ))}
          </div>
          {upiApp === "Enter UPI ID manually" && (
            <input
              type="text"
              placeholder="yourname@upi"
              className="mt-4 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          )}
        </div>
      )}

      {/* Card Section */}
      {paymentMethod === "Credit/Debit Card" && (
        <div className="mt-6 bg-[#fff8dc] border border-yellow-300 rounded-xl p-5 font-serif">
          <p className="font-semibold text-sm mb-3 text-[#6A4E3A]">Enter Card Details:</p>
          <input
            type="text"
            placeholder="Card Number"
            className="block w-full mb-3 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={cardDetails.number}
            onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
          />
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="MM/YY"
              className="w-1/2 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={cardDetails.expiry}
              onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
            />
            <input
              type="password"
              placeholder="CVV"
              className="w-1/2 p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={cardDetails.cvv}
              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
            />
          </div>
        </div>
      )}

      {/* Net Banking Section */}
      {paymentMethod === "Net Banking" && (
        <div className="mt-6 bg-[#fff8dc] border border-yellow-300 rounded-xl p-5 font-serif">
          <p className="font-semibold text-sm mb-3 text-[#6A4E3A]">Choose a Bank:</p>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
          >
            <option value="">-- Select Bank --</option>
            <option>SBI</option>
            <option>HDFC Bank</option>
            <option>ICICI Bank</option>
            <option>Kotak Mahindra</option>
            <option>Axis Bank</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default PaymentOptions;
