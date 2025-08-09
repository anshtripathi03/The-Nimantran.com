import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    enum: ['marriage', 'birthday', 'festival', 'baby-shower', 'business']
  },
  price: {
    type: Number,
    required: true
  },
  quantityAvailable: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    default: 0
  },
  description: {
    type: String,
    default: ""
  },
  reviewsCount: {
    type: Number,
    default: 0
  },
  images: {
    primaryImage: {
      type: String,
      required: true
    },
    secondaryImage: {
      type: String,
      default: ""
    }
  },
  specifications: {
    material: { type: String },
    dimensions: { type: String },
    printing: { type: String },
    weight: { type: String },
    color: { type: String },
    customizable: {
      type: Boolean,
      required: true
    }
  }
}, {
  timestamps: true
});

export const Product = mongoose.model("Product", productSchema);
