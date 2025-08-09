import React, { useState } from "react";
import axios from "axios";

const categories = ["marriage", "birthday", "festival", "baby-shower", "business"];

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantityAvailable: "",
    description: "",
    rating: 0,
    reviewsCount: 0,
    images: {
      primaryImage: "",
      secondaryImage: ""
    },
    specifications: {
      material: "",
      dimensions: "",
      printing: "",
      weight: "",
      color: "",
      customizable: false
    }
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("images.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        images: {
          ...prev.images,
          [key]: value
        }
      }));
    } else if (name.startsWith("specifications.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [key]: type === "checkbox" ? checked : value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("/api/admin/addProduct", formData, {
        withCredentials: true
      });

      setMessage("✅ Product added successfully!");
      setFormData({
        name: "",
        category: "",
        price: "",
        quantityAvailable: "",
        description: "",
        rating: 0,
        reviewsCount: 0,
        images: { primaryImage: "", secondaryImage: "" },
        specifications: {
          material: "",
          dimensions: "",
          printing: "",
          weight: "",
          color: "",
          customizable: false
        }
      });
    } catch (error) {
      setMessage(
        "❌ Failed to add product: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
      {message && <div className="mb-4 text-sm text-red-600">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <div className="flex gap-4">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-1/2 p-2 border rounded"
            required
          />
          <input
            type="number"
            name="quantityAvailable"
            placeholder="Stock Qty"
            value={formData.quantityAvailable}
            onChange={handleChange}
            className="w-1/2 p-2 border rounded"
            required
          />
        </div>

        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <div className="flex gap-4">
          <input
            type="number"
            name="rating"
            placeholder="Rating (0-5)"
            value={formData.rating}
            onChange={handleChange}
            className="w-1/2 p-2 border rounded"
            step="0.1"
            min="0"
            max="5"
          />
          <input
            type="number"
            name="reviewsCount"
            placeholder="Reviews Count"
            value={formData.reviewsCount}
            onChange={handleChange}
            className="w-1/2 p-2 border rounded"
          />
        </div>

        <input
          type="text"
          name="images.primaryImage"
          placeholder="Primary Image URL"
          value={formData.images.primaryImage}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="images.secondaryImage"
          placeholder="Secondary Image URL"
          value={formData.images.secondaryImage}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <h3 className="font-semibold mt-4">Specifications</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="specifications.material"
            placeholder="Material"
            value={formData.specifications.material}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="specifications.dimensions"
            placeholder="Dimensions"
            value={formData.specifications.dimensions}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="specifications.printing"
            placeholder="Printing Type"
            value={formData.specifications.printing}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="specifications.weight"
            placeholder="Weight"
            value={formData.specifications.weight}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="specifications.color"
            placeholder="Color"
            value={formData.specifications.color}
            onChange={handleChange}
            className="p-2 border rounded"
          />
          <label className="flex items-center gap-2 col-span-2">
            <input
              type="checkbox"
              name="specifications.customizable"
              checked={formData.specifications.customizable}
              onChange={handleChange}
              className="w-5 h-5"
            />
            Customizable
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
