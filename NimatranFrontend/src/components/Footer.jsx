import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhoneAlt,
  FaRegQuestionCircle,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white pt-10 pb-4 border-t border-gray-300 mt-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">TheNimantran.com</h1>
          <p className="text-sm">
            Your one-stop solution for personalized and elegant invitation cards for every event.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Contact Us</h2>
          <p className="flex items-center gap-2 mb-1">
            <FaPhoneAlt className="text-white" />
            +91 9876543210
          </p>
          <p className="flex items-center gap-2">
            <FaEnvelope className="text-white" />
            support@thenimantran.com
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Quick Links</h2>
          <ul className="space-y-1 text-sm">
            <li><a href="#hero" className="hover:text-primary">Home</a></li>
            <li><a href="#services" className="hover:text-primary">Our Services</a></li>
            <li><a href="#categories" className="hover:text-primary">Categories</a></li>
            <li><a href="#query" className="hover:text-primary">Contact / Query</a></li>
          </ul>
        </div>

        {/* Social Media & Help */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Stay Connected</h2>
          <div className="flex items-center gap-4 mb-4">
            <a href="https://facebook.com" target="_blank" className="hover:text-primary">
              <FaFacebookF size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" className="hover:text-primary">
              <FaInstagram size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" className="hover:text-primary">
              <FaTwitter size={20} />
            </a>
            <a href="">
              <FaYoutube size={20}className="hover:text-primary"/>
            </a>
            <a href="">
              <FaLinkedinIn size= {20} className="hover:text-primary"/>
            </a>
          </div>
          <a href="#query" className="flex items-center gap-2 text-sm hover:text-primary">
            <FaRegQuestionCircle />
            Need Help? Submit a Query
          </a>
        </div>
      </div>

      <div className="border-t border-gray-300 mt-8 pt-4 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} TheNimantran.com. All rights reserved.
      </div>
    </footer>
  );
}
