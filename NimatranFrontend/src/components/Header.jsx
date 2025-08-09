import { useState, useContext, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaUser, FaStore, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import WhatsAppButton from "./Whatsapp";
import Fuse from "fuse.js";
import dummyCards from "../Data.jsx";
import Login from "../pages/Login.jsx"
import Signup from "../pages/Signup.jsx"
// Fuse.js config
const fuse = new Fuse(dummyCards, {
  includeScore: true,
  threshold: 0.4,
  keys: ["title", "description", "color", "size", "category", "dimensions", "type"],
});

function Header() {
  const { showLogin, setShowLogin, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const results = fuse.search(searchQuery.trim()).slice(0, 5);
    setSuggestions(results);
    setActiveIndex(-1);
  }, [searchQuery]);

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (activeIndex >= 0 && suggestions[activeIndex]) {
        handleSelect(suggestions[activeIndex].item);
      } else {
        handleSearchSubmit();
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    }
  };

  const handleSelect = (item) => {
    setSearchQuery(item.title);
    setSuggestions([]);
    navigate(`/search?query=${encodeURIComponent(item.title)}`);
  };

  const handleDashboardClick = () => {
    navigate(user?.isWholeseller ? "/dashboard/wholeseller" : "/dashboard/user");
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="shadow-md sticky top-0 z-50 bg-blue-900">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-4">
        {/* Logo + Hamburger */}
        <div className="flex items-center justify-between w-full md:w-auto">

              <div  className="flex justify-center items-center">

  <button
            className="text-white text-xl md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <Link to="/" className="flex items-center space-x-2">
            <img src="./name.png" alt="Nimantran Logo" className="h-10 w-auto object-contain" />
          </Link>


              </div>

           <div className="flex justify-center items-center md:hidden">
    <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative px-3 py-2 rounded-md text-xl transition ${
                isActive ? "bg-pink-600 text-white" : "text-white hover:bg-[#195fc4]"
              }`
            }
          >
            🛒
          </NavLink>
           {!user ? (
            <button
              onClick={() => setShowLogin((prev) => ({ ...prev, login: true }))}
              className="px-3 py-2 rounded-md text-white hover:bg-[#195fc4]"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleDashboardClick}
              className="px-3 py-2 rounded-md text-white hover:bg-[#195fc4]"
              title="Dashboard"
            >
              {user?.isWholeseller ? <FaStore size={20} /> : <FaUser size={20} />}
            </button>
          )}

           </div>
         
        
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:flex-1 md:max-w-lg">
          <div className="relative">
            <input
              ref={inputRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search invitations, colors, styles..."
              className="w-full h-10 px-4 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              onClick={handleSearchSubmit}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              title="Search"
            >
              <FaSearch />
            </button>
          </div>

          {suggestions.length > 0 && (
            <ul className="absolute z-50 bg-white w-full shadow-md rounded-md mt-1 max-h-64 overflow-y-auto">
              {suggestions.map(({ item }, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(item)}
                  className={`px-4 py-2 cursor-pointer border-b hover:bg-blue-100 ${
                    index === activeIndex ? "bg-blue-100" : ""
                  }`}
                >
                  <div className="font-semibold">{item.title}</div>
                  <div className="text-sm text-gray-600">
                    {item.color} | {item.size} | {item.category}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4 text-sm font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition ${
                isActive ? "bg-pink-600 text-white" : "text-white hover:bg-[#195fc4]"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/buisness"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md transition ${
                isActive ? "bg-pink-600 text-white" : "text-white hover:bg-[#195fc4]"
              }`
            }
          >
            Business
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative px-3 py-2 rounded-md text-xl transition ${
                isActive ? "bg-pink-600 text-white" : "text-white hover:bg-[#195fc4]"
              }`
            }
          >
            🛒
          </NavLink>
          {!user ? (
            <button
              onClick={() => setShowLogin((prev) => ({ ...prev, login: true }))}
              className="px-3 py-2 rounded-md text-white hover:bg-[#195fc4]"
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleDashboardClick}
              className="px-3 py-2 rounded-md text-white hover:bg-[#195fc4]"
              title="Dashboard"
            >
              {user?.isWholeseller ? <FaStore size={20} /> : <FaUser size={20} />}
            </button>
          )}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}></div>
          <div className="fixed top-0 left-0 w-64 h-full bg-blue-800 z-50 p-5 space-y-4 text-white font-medium shadow-lg">
            <NavLink to="/" onClick={toggleMenu} className="block hover:text-yellow-300">
              Home
            </NavLink>
            <NavLink to="/buisness" onClick={toggleMenu} className="block hover:text-yellow-300">
              Business
            </NavLink>
            <NavLink to="/cart" onClick={toggleMenu} className="block hover:text-yellow-300">
              Cart 🛒
            </NavLink>
            {!user ? (
              <button
                onClick={() => {
                  toggleMenu();
                  setShowLogin((prev) => ({ ...prev, login: true }));
                }}
                className="w-full text-left hover:text-yellow-300"
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => {
                  toggleMenu();
                  handleDashboardClick();
                }}
                className="w-full text-left hover:text-yellow-300"
              >
                {user?.isWholeseller ? "Wholeseller Dashboard" : "User Dashboard"}
              </button>
            )}
          </div>
        </>
      )}
       {/* Modals */}
      {showLogin.login && (
        <Login onClose={() => setShowLogin({ login: false, signup: false })} />
      )}
      {showLogin.signup && (
        <Signup onClose={() => setShowLogin({ login: false, signup: false })} />
      )}


      <WhatsAppButton />
    </header>
  );
}

export default Header;
