import asyncHandler from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import ApiResponse from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";

// POST /api/product/add
const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    price,
    quantityAvailable,
    description,
    rating,
    reviewsCount,
    images,
    specifications
  } = req.body;

  // Basic validation
  if (!name || !category || !price || !quantityAvailable || !images?.primaryImage || !specifications?.customizable) {
    throw new ApiError(400, "Missing required fields");
  }

  const newProduct = await Product.create({
    name,
    category,
    price,
    quantityAvailable,
    description,
    rating,
    reviewsCount,
    images,
    specifications
  });

  return res.status(201).json(new ApiResponse(201, newProduct, "Product added successfully"));
});
const fetchProducts = asyncHandler(async (req,res)=>{


const product = await Product.find({}).exec()


return res
.status(202)
.json(
  new ApiResponse(200,product,"Products fetched successfully")
)

})
const getAllProducts = asyncHandler(async (req, res) => {
  const { category, search, page = 1, limit = 10 } = req.query;

  const filter = {};
  if (category) filter.category = category.toLowerCase();
  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  const skip = (page - 1) * limit;

  const total = await Product.countDocuments(filter);

  const products = await Product.find(filter)
    .skip(skip)
    .limit(Number(limit))
    .sort({ createdAt: -1 }) // Newest first
    .exec();

  res.status(200).json(
    new ApiResponse(200, {
      products,
      total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
    }, "Products fetched successfully")
  );
});
export {addProduct,fetchProducts,getAllProducts}