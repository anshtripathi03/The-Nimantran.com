import { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useLoading } from "../context/LoadingContext";

const Login = ({ onClose }) => {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    email: "",
    password: "",
    otp: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isOtpMode, setIsOtpMode] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
const { showLogin, setUser, setShowLogin } = useContext(AuthContext);
  const { setLoading } = useLoading();
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendOtp = async () => {
    setError("");
    setSuccess("");
    if (!formData.email.trim()) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/auth/loginOtp", { email: formData.email }, { withCredentials: true });

      if (res.data?.success) {
        setIsOtpSent(true);
        setSuccess("OTP sent to your email.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", {
        email: formData.email,
        otp: formData.otp,
      });

      if (res.data?.success) {
        setUser(res.data.data);
        setShowLogin({ login: false, signup: false });
        navigate("/");
      } else {
        setError("Invalid OTP.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", formData, {
        withCredentials: true,
      });

      if (res.data?.success) {
        setUser(res.data.data);
        setShowLogin({ login: false, signup: false });
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  if (!showLogin?.login) return null;

  return (
    <div className="flex justify-center items-center min-h-screen fixed inset-0 bg-gray-100 bg-opacity-50 z-50">
      <form
        onSubmit={isOtpMode ? (e) => e.preventDefault() : handlePasswordLogin}
        ref={modalRef}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-600 mb-4 text-center">{success}</p>}

        {isOtpMode ? (
          <>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-2 border rounded"
              required
              autoFocus
            />

            {!isOtpSent ? (
              <button
                type="button"
                onClick={sendOtp}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-4"
              >
                Send OTP
              </button>
            ) : (
              <>
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={formData.otp}
                  onChange={handleChange}
                  className="w-full mb-4 px-4 py-2 border rounded"
                  required
                />
                <button
                  type="button"
                  onClick={verifyOtp}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded mb-4"
                >
                  Verify OTP
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <input
              type="text"
              name="emailOrPhone"
              placeholder="Email or Phone"
              value={formData.emailOrPhone}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-2 border rounded"
              required
              autoFocus
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mb-6 px-4 py-2 border rounded"
              required
            />
          </>
        )}

        <button
          type="button"
          onClick={() => {
            setIsOtpMode((prev) => !prev);
            setFormData((prev) => ({
              ...prev,
              email: "",
              otp: "",
              emailOrPhone: "",
              password: "",
            }));
            setError("");
            setSuccess("");
            setIsOtpSent(false);
          }}
          className="w-full bg-gray-300 hover:bg-gray-400 text-black py-2 rounded mb-4"
        >
          {isOtpMode ? "Use password instead" : "Use OTP instead via email"}
        </button>

        {!isOtpMode && (
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            Login
          </button>
        )}

        <p className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <span
            className="text-green-600 hover:underline cursor-pointer"
            onClick={() =>
              setShowLogin((prev) => ({ ...prev, login: false, signup: true }))
            }
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
