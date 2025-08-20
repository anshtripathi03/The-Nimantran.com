import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config.js";
import PropTypes from 'prop-types';

export default function CardForm({ initialForm, cardId, isUpdating, fetchCards,setIsUpdating }) {
   const resetForm = {
    name: "",
    category: "marriage",
    price: "",
    discount: "",
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
  }


  const [form, setForm] = useState({
    name: '',
    category: 'marriage',
    price: 0,
    discount: 0,
    isAvailableForWholesale: false,
    wholesalePrice: 0,
    quantityAvailable: 0,
    rating: 0,
    description: '',
    reviewsCount: 0,
    isPopular: false,
    isTrending: false,
    specifications: {
      material: '',
      dimensions: '',
      printing: '',
      weight: '',
      color: '',
      customizable: false
    },
    images: {
      primaryImage: '',
      secondaryImage: ''
    }
  });
  
  const [primaryImage, setPrimaryImage] = useState(null);
  const [secondaryImage, setSecondaryImage] = useState(null);
  const [primaryPreview, setPrimaryPreview] = useState("");
  const [secondaryPreview, setSecondaryPreview] = useState("");
  const [uploadProgress, setUploadProgress] = useState({ primary: 0, secondary: 0 });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Initialize form with default values or props
  useEffect(() => {
    if (initialForm) {
      setForm(prev => ({
        ...prev,
        ...initialForm,
        specifications: {
          ...prev.specifications,
          ...(initialForm.specifications || {})
        }
      }));
      
      if (initialForm.images) {
        setPrimaryPreview(initialForm.images.primaryImage || "");
        setSecondaryPreview(initialForm.images.secondaryImage || "");
      }
    }
  }, [initialForm]);

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (primaryPreview) URL.revokeObjectURL(primaryPreview);
      if (secondaryPreview) URL.revokeObjectURL(secondaryPreview);
    };
  }, [primaryPreview, secondaryPreview]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    try {
      if (name.startsWith("specifications.")) {
        const key = name.split(".")[1];
        setForm(prev => ({
          ...prev,
          specifications: { 
            ...prev.specifications, 
            [key]: type === "checkbox" ? checked : value 
          },
        }));
      } else if (type === "checkbox") {
        setForm(prev => ({ ...prev, [name]: checked }));
      } else if (type === "number") {
        setForm(prev => ({ 
          ...prev, 
          [name]: value === "" ? "" : Number(value) 
        }));
      } else {
        setForm(prev => ({ ...prev, [name]: value }));
      }
    } catch (error) {
      console.error("Error handling form change:", error);
      setMessage({ text: "Error updating form field", type: "error" });
    }
  };

  const handleImageChange = (e, setImage, setPreview) => {
    try {
      const file = e.target.files[0];
      if (!file) return;
      
      // Validate image file
      if (!file.type.match('image.*')) {
        setMessage({ text: "Please select a valid image file", type: "error" });
        return;
      }
      
      // Limit file size to 5MB
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ text: "Image size should be less than 5MB", type: "error" });
        return;
      }
      
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    } catch (error) {
      console.error("Error handling image change:", error);
      setMessage({ text: "Error processing image", type: "error" });
    }
  };

  const handlePrimaryChange = (e) => handleImageChange(e, setPrimaryImage, setPrimaryPreview);
  const handleSecondaryChange = (e) => handleImageChange(e, setSecondaryImage, setSecondaryPreview);

  const validateForm = () => {
    if (!form.name.trim()) {
      setMessage({ text: "Card name is required", type: "error" });
      return false;
    }
    
    if (form.price <= 0) {
      setMessage({ text: "Price must be greater than 0", type: "error" });
      return false;
    }
    
    if (form.isAvailableForWholesale && form.wholesalePrice <= 0) {
      setMessage({ text: "Wholesale price must be greater than 0", type: "error" });
      return false;
    }
    
    if (!isUpdating && !primaryImage) {
      setMessage({ text: "Primary image is required", type: "error" });
      return false;
    }
    
    return true;
  };

  const submitCard = useCallback(async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    setMessage({ text: "", type: "" });

    const formData = new FormData();

    try {
      // Append all form fields except specifications and images
      Object.keys(form).forEach((key) => {
        if (key !== "specifications" && key !== "images") {
          formData.append(key, form[key]);
        }
      });

      // Append specifications
      Object.entries(form.specifications).forEach(([key, value]) => {
        formData.append(`specifications[${key}]`, value);
      });

      // Append images if they exist
      if (primaryImage) formData.append("primaryImage", primaryImage);
      if (secondaryImage) formData.append("secondaryImage", secondaryImage);

      let res;
      if (isUpdating && cardId) {
        res = await axios.put(`${API_BASE_URL}/api/admin/updateCard/${cardId}`, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(prev => ({ ...prev, primary: progress }));
          }
        });
        setMessage({ text: "Card updated successfully!", type: "success" });
        setForm({...resetForm})
        setIsUpdating(false)
        setPrimaryPreview("")
        setSecondaryPreview("")
      } else {
        res = await axios.post(`${API_BASE_URL}/api/admin/createCard`, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(prev => ({ ...prev, secondary: progress }));
          }
        });
        setMessage({ text: "Card created successfully!", type: "success" });
      setForm({...resetForm})
        setPrimaryPreview("")
        setSecondaryPreview("")

      }

      // Reset form after successful submission for new cards
      if (!isUpdating) {
        setForm({
          ...initialForm,
          specifications: {
            material: '',
            dimensions: '',
            printing: '',
            weight: '',
            color: '',
            customizable: false
          }
        });
        setPrimaryImage(null);
        setSecondaryImage(null);
        setPrimaryPreview("");
        setSecondaryPreview("");
      }

      if (fetchCards) fetchCards();
    } catch (err) {
      console.error("API Error:", err);
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          "Operation failed. Please try again.";
      setMessage({ text: errorMessage, type: "error" });
    } finally {
      setLoading(false);
    }
  }, [form, primaryImage, secondaryImage, isUpdating, cardId, fetchCards, initialForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    submitCard();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6">
        {isUpdating ? "Update Card" : "Add New Card"}
      </h2>

      {message.text && (
        <div className={`mb-4 p-2 rounded ${
          message.type === "error" 
            ? "bg-red-100 text-red-800" 
            : "bg-green-100 text-green-800"
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        {/* Card Name */}
        <div>
          <label className="block mb-1 font-medium">Card Name *</label>
          <input 
            type="text" 
            name="name" 
            value={form.name} 
            onChange={handleChange} 
            required 
            className="w-full border rounded px-3 py-2" 
            maxLength={100}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category *</label>
          <select 
            name="category" 
            value={form.category} 
            onChange={handleChange} 
            className="w-full border rounded px-3 py-2"
            required
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
            <label className="block mb-1 font-medium">Price (₹) *</label>
            <input 
              type="number" 
              name="price" 
              value={form.price} 
              onChange={handleChange} 
              required 
              min="0"
              step="0.01"
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
              min="0"
              max={form.price}
              step="0.01"
              className="w-full border rounded px-3 py-2" 
            />
          </div>
        </div>

        {/* Wholesale & Quantity */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              name="isAvailableForWholesale" 
              checked={form.isAvailableForWholesale} 
              onChange={handleChange} 
              className="mr-2"
            />
            <span>Available for Wholesale</span>
          </div>
          <div>
            <label className="block mb-1 font-medium">Wholesale Price (₹)</label>
            <input 
              type="number" 
              name="wholesalePrice" 
              value={form.wholesalePrice} 
              onChange={handleChange} 
              min="0"
              step="0.01"
              disabled={!form.isAvailableForWholesale}
              className="w-full border rounded px-3 py-2 disabled:bg-gray-100" 
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Quantity Available *</label>
            <input 
              type="number" 
              name="quantityAvailable" 
              value={form.quantityAvailable} 
              onChange={handleChange} 
              required 
              min="0"
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
              min="0" 
              max="5" 
              step="0.1" 
              className="w-full border rounded px-3 py-2" 
            />
          </div>
        </div>

        {/* Description & Reviews Count */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea 
              name="description" 
              value={form.description} 
              onChange={handleChange} 
              className="w-full border rounded px-3 py-2" 
              maxLength={500}
              rows={4}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Reviews Count</label>
            <input 
              type="number" 
              name="reviewsCount" 
              value={form.reviewsCount} 
              onChange={handleChange} 
              min="0" 
              className="w-full border rounded px-3 py-2" 
            />
          </div>
        </div>

        {/* Popular / Trending */}
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2">
            <input 
              type="checkbox" 
              name="isPopular" 
              checked={form.isPopular} 
              onChange={handleChange} 
            />
            Popular
          </label>
          <label className="flex items-center gap-2">
            <input 
              type="checkbox" 
              name="isTrending" 
              checked={form.isTrending} 
              onChange={handleChange} 
            />
            Trending
          </label>
        </div>

        {/* Images */}
        <div>
          <label className="block mb-1 font-medium">
            Primary Image {!isUpdating && "*"}
          </label>
          {primaryPreview && (
            <img 
              src={primaryPreview} 
              alt="Primary preview" 
              className="mb-2 w-32 h-32 object-cover rounded" 
            />
          )}
          <input 
            type="file" 
            accept="image/*" 
            onChange={handlePrimaryChange} 
            className="w-full border rounded px-3 py-2" 
            required={!isUpdating}
          />
          {uploadProgress.primary > 0 && uploadProgress.primary < 100 && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${uploadProgress.primary}%` }}
              ></div>
            </div>
          )}
        </div>
        <div>
          <label className="block mb-1 font-medium">Secondary Image</label>
          {secondaryPreview && (
            <img 
              src={secondaryPreview} 
              alt="Secondary preview" 
              className="mb-2 w-32 h-32 object-cover rounded" 
            />
          )}
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleSecondaryChange} 
            className="w-full border rounded px-3 py-2" 
          />
          {uploadProgress.secondary > 0 && uploadProgress.secondary < 100 && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${uploadProgress.secondary}%` }}
              ></div>
            </div>
          )}
        </div>

        {/* Specifications */}
        <h3 className="text-lg font-semibold mt-4 mb-2">Specifications</h3>
        <div className="grid grid-cols-2 gap-4">
          {["material", "dimensions", "printing", "weight", "color"].map((spec) => (
            <div key={spec}>
              <label className="block mb-1 font-medium">
                {spec.charAt(0).toUpperCase() + spec.slice(1)}
              </label>
              <input 
                type="text" 
                name={`specifications.${spec}`} 
                value={form.specifications[spec]} 
                onChange={handleChange} 
                className="w-full border rounded px-3 py-2" 
                maxLength={50}
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

        <button 
          type="submit" 
          disabled={loading} 
          className={`mt-4 px-6 py-2 text-white rounded ${
            loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {isUpdating ? "Saving..." : "Submitting..."}
            </span>
          ) : (
            isUpdating ? "Save Updated Card" : "Submit Card"
          )}
        </button>
      </form>
    </div>
  );
}

CardForm.propTypes = {
  initialForm: PropTypes.shape({
    name: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.number,
    discount: PropTypes.number,
    isAvailableForWholesale: PropTypes.bool,
    wholesalePrice: PropTypes.number,
    quantityAvailable: PropTypes.number,
    rating: PropTypes.number,
    description: PropTypes.string,
    reviewsCount: PropTypes.number,
    isPopular: PropTypes.bool,
    isTrending: PropTypes.bool,
    specifications: PropTypes.shape({
      material: PropTypes.string,
      dimensions: PropTypes.string,
      printing: PropTypes.string,
      weight: PropTypes.string,
      color: PropTypes.string,
      customizable: PropTypes.bool
    }),
    images: PropTypes.shape({
      primaryImage: PropTypes.string,
      secondaryImage: PropTypes.string
    })
  }),
  cardId: PropTypes.string,
  isUpdating: PropTypes.bool,
  fetchCards: PropTypes.func
};

CardForm.defaultProps = {
  initialForm: {
    name: '',
    category: 'marriage',
    price: 0,
    discount: 0,
    isAvailableForWholesale: false,
    wholesalePrice: 0,
    quantityAvailable: 0,
    rating: 0,
    description: '',
    reviewsCount: 0,
    isPopular: false,
    isTrending: false,
    specifications: {
      material: '',
      dimensions: '',
      printing: '',
      weight: '',
      color: '',
      customizable: false
    },
    images: {
      primaryImage: '',
      secondaryImage: ''
    }
  },
  isUpdating: false
};