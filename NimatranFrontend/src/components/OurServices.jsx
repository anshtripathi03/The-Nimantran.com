import {
  FaTruck,
  FaCreditCard,
  FaTags,
  FaImage,
  FaPencilAlt,
  FaShoppingCart,
} from "react-icons/fa";

const services = [
  {
    icon: <FaPencilAlt size={24} />,
    title: "Custom Invitation Cards",
    desc: "Design and print unique cards for weddings, birthdays, festivals & more.",
  },
  {
    icon: <FaImage size={24} />,
    title: "Preview Before You Buy",
    desc: "Get digital previews before final printing.",
  },
  {
    icon: <FaTruck size={24} />,
    title: "Pan-India Delivery",
    desc: "Safe and on-time delivery across India.",
  },
  {
    icon: <FaShoppingCart size={24} />,
    title: "Seamless Shopping",
    desc: "Flipkart-style smooth shopping experience.",
  },
  {
    icon: <FaCreditCard size={24} />,
    title: "Multiple Payment Options",
    desc: "Supports UPI, cards, wallets, and COD.",
  },
  {
    icon: <FaTags size={24} />,
    title: "Bulk Order Discounts",
    desc: "Enjoy discounts on large quantity orders.",
  },
];

export default function OurServices() {
  return (
    <section className="py-16 bg-white" id="services">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-[#5b2c06] mb-12 text-center">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#fff7ef] border border-[#e7d3b5] p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="text-[#a0441e] mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-[#5b2c06] mb-2">
                {service.title}
              </h3>
              <p className="text-[#7a5c3d]">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
