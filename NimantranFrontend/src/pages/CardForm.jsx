import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config.js";

const initialForm = {
  name: "",
  category: "marriage",
  price: "",
  discount: "", // matches backend naming
  quantityAvailable: "",
  rating: "",
  description: "",
  reviewsCount: "",
  isPopular: false,
  isTrending: false,
  isAvailableForWholesale: false,
  wholesalePrice: "",
  specifications: {
    material: "",
    dimensions: "",
    printing: "",
    weight: "",
    color: "",
    customizable: false,
  },
};

export default function CardForm() {
  const [form, setForm] = useState(initialForm);
  const [primaryImage, setPrimaryImage] = useState(null);
  const [secondaryImage, setSecondaryImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState({ primary: 0, secondary: 0 });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("specifications.")) {
      const key = name.split(".")[1];
      setForm({
        ...form,
        specifications: { ...form.specifications, [key]: type === "checkbox" ? checked : value },
      });
    } else if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "number") {
      setForm({ ...form, [name]: value === "" ? "" : Number(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setUploadProgress({ primary: 0, secondary: 0 });

    try {
      const formData = new FormData();

      Object.keys(form).forEach((key) => {
        if (key !== "specifications") {
          formData.append(key, form[key]);
        }
      });

      Object.entries(form.specifications).forEach(([key, value]) => {
        formData.append(`specifications[${key}]`, value);
      });

      if (primaryImage) formData.append("primaryImage", primaryImage);
      if (secondaryImage) formData.append("secondaryImage", secondaryImage);

      await axios.post(`${API_BASE_URL}/api/admin/createCard`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          if (primaryImage && !secondaryImage) {
            setUploadProgress({ primary: percent, secondary: 0 });
          } else if (secondaryImage && !primaryImage) {
            setUploadProgress({ primary: 0, secondary: percent });
          } else {
            // both present, split evenly
            setUploadProgress({
              primary: Math.min(percent, 50) * 2,
              secondary: Math.max(0, percent - 50) * 2,
            });
          }
        },
      });

      setMessage("Card submitted successfully!");
      setForm(initialForm);
      setPrimaryImage(null);
      setSecondaryImage(null);
    } catch (err) {
      setMessage(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6">Add New Card</h2>

      {message && <div className="mb-4 p-2 bg-green-100 text-green-800 rounded">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        {/* Card Name */}
        <div>
          <label className="block mb-1 font-medium">Card Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="marriage">Marriage</option>
            <option value="birthday">Birthday</option>
            <option value="festival">Festival</option>
            <option value="baby-shower">Baby Shower</option>
            <option value="business">Business</option>
          </select>
        </div>

        {/* Price & Discount */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Discount Price (₹ Off)</label>
            <input
              type="number"
              name="discount"
              value={form.discount}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Wholesale */}
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isAvailableForWholesale"
              checked={form.isAvailableForWholesale}
              onChange={handleChange}
            />
            Available for Wholesale
          </label>
          <div>
            <label className="block mb-1 font-medium">Wholesale Price (₹)</label>
            <input
              type="number"
              name="wholesalePrice"
              value={form.wholesalePrice}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Quantity & Rating */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Quantity Available</label>
            <input
              type="number"
              name="quantityAvailable"
              value={form.quantityAvailable}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Rating</label>
            <input
              type="number"
              name="rating"
              value={form.rating}
              onChange={handleChange}
              min={0}
              max={5}
              step={0.1}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Description & Reviews */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Reviews Count</label>
            <input
              type="number"
              name="reviewsCount"
              value={form.reviewsCount}
              onChange={handleChange}
              min={0}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Popular / Trending */}
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="isPopular" checked={form.isPopular} onChange={handleChange} />
            Popular
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="isTrending" checked={form.isTrending} onChange={handleChange} />
            Trending
          </label>
        </div>

        {/* Images */}
        <div>
          <label className="block mb-1 font-medium">Primary Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPrimaryImage(e.target.files[0])}
            required
            className="w-full border rounded px-3 py-2"
          />
          {primaryImage && (
            <div className="text-sm mt-1">Uploading: {Math.round(uploadProgress.primary)}%</div>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Secondary Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setSecondaryImage(e.target.files[0])}
            className="w-full border rounded px-3 py-2"
          />
          {secondaryImage && (
            <div className="text-sm mt-1">Uploading: {Math.round(uploadProgress.secondary)}%</div>
          )}
        </div>

        {/* Specifications */}
        <h3 className="text-lg font-semibold mt-4 mb-2">Specifications</h3>
        <div className="grid grid-cols-2 gap-4">
          {["material", "dimensions", "printing", "weight", "color"].map((spec) => (
            <div key={spec}>
              <label className="block mb-1 font-medium">{spec.charAt(0).toUpperCase() + spec.slice(1)}</label>
              <input
                type="text"
                name={`specifications.${spec}`}
                value={form.specifications[spec]}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          ))}
          <div className="flex items-center gap-2 mt-6">
            <input
              type="checkbox"
              name="specifications.customizable"
              checked={form.specifications.customizable}
              onChange={handleChange}
            />
            <span>Customizable</span>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Submitting..." : "Submit Card"}
        </button>
      </form>
    </div>
  );
}
