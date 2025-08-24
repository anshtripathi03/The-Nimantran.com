import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config";
import { useNavigate } from "react-router-dom";

export default function UpdateUserInfo() {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const getUserData = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/user/auth/me`, {
                withCredentials: true
            });
            console.log("User details are", res);

            setUser(res.data.data);
            setFormData({
                name: res.data.data?.name || "",
                phone: res.data.data?.phone || "",
                email: res.data.data?.email || "",
                otp: "",
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        otp: "",
        phone: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isSent, setIsSent] = useState(false);
    const [isVerified, setIsVerified] = useState(true);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            if (!isVerified) {
                setError("Please verify your email before signing up.");
                return;
            }
            const res = await axios.put(
                `${API_BASE_URL}/api/user/auth/updateProfile`,
                formData,
                { withCredentials: true }
            );
            console.log("Profile updated:", res.data);
            setUser(res.data.data);
            toast.success("Profile updated successfully!");
            navigate("/dashboard/user");
        } catch (err) {
            console.error("Update failed:", err.response?.data || err.message);
            alert("Update failed. Check inputs and OTP.");
        }
    };

    const sendOtp = async () => {
        setError("");
        if (!formData.email.trim()) {
            setError("Please enter a valid email.");
            return;
        }
        try {
            const res = await axios.post(
                `${API_BASE_URL}/api/user/auth/getLoginOtp`,
                { email: formData.email },
                { withCredentials: true }
            );

            if (res.data?.success) {
                setIsSent(true);
                setError("");
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Failed to send OTP");
        }
    };

    const verifyOtp = async () => {
        setError("");

        try {
            const res = await axios.post(`${API_BASE_URL}/api/user/auth/checkOtp`, {
                email: formData.email,
                otp: formData.otp.trim(),
            });

            if (res.data?.success) {
                setIsVerified(true);
                setError("");
            } else {
                setError("Invalid OTP. Please try again.");
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "OTP verification failed");
        }
    };


    useEffect(() => {
        getUserData();
    }, [])

    return (
        <div>
            {(loading) ? (
                <h1>Loading...</h1>
            ) : (
                <div>
                    <div className="mt-8 flex justify-center items-center">
                        <form
                            onSubmit={handleUpdate}
                            className="bg-white p-8 rounded shadow-md w-full max-w-md relative"
                        >
                            <button
                                type="button"
                                onClick={() => navigate("/dashboard/user")}
                                className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
                            >
                                &times;
                            </button>

                            <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>

                            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                            {success && <p className="text-green-600 mb-4 text-center">{success}</p>}

                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full mb-4 px-4 py-2 border rounded"
                                required
                                autoFocus
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => {
                                    handleChange(e);
                                    setIsVerified(false);
                                }}
                                className="w-full mb-4 px-4 py-2 border rounded"
                                required
                            />
                            {(formData.email !== user.email) &&
                                <div className="flex items-center gap-2 mb-4">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            sendOtp();
                                        }}
                                        className={`px-4 py-2 text-white rounded ${isSent ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                                            }`}
                                        disabled={isSent}
                                    >
                                        {isSent ? "OTP Sent" : "Send OTP"}
                                    </button>
                                </div>
                            }

                            {isSent && !isVerified && (
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        name="otp"
                                        value={formData.otp}
                                        onChange={handleChange}
                                        placeholder="Enter the OTP sent to your email"
                                        className="w-full mb-2 px-4 py-2 border rounded"
                                    />
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            verifyOtp();
                                        }}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        Verify OTP
                                    </button>
                                </div>
                            )}

                            {((formData.email !== user.email) && (isVerified)) && 
                            <p className="text-green-600 mb-4">Email verified</p>}

                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full mb-4 px-4 py-2 border rounded"
                                required
                            />




                            <button
                                type="submit"
                                className={`w-full text-white py-2 rounded flex items-center justify-center ${isVerified ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                                    }`}
                            >
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )

}