import asyncHandler from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import { redisClient } from "../middlewares/otp.middleware.js";
import bcrypt, { genSalt } from "bcrypt"
import { sendEmail } from "../utils/sendMail.js";
import { generateOTP, sendOTP, verifyOtp } from "./verification.controller.js";
import jwt from "jsonwebtoken"
import { options } from "../middlewares/auth.middlerware.js";
// Helper to generate tokens and save refresh token
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(500, "Error generating tokens");
  }
};

// Utility to safely parse boolean from string
const parseBoolean = (value) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") return value.toLowerCase() === "true";
  return false;
};

// REGISTER CONTROLLER
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;
  const isRetailer = parseBoolean(req.body.isRetailer);

  // Field validation
  if (
    [name, email, password, phone].some(
      (field) => !field || String(field).trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (!/^\d{10}$/.test(phone)) {
    throw new ApiError(400, "Invalid phone number: must be 10 digits");
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    throw new ApiError(400, "Invalid email format");
  }

  if (typeof isRetailer !== "boolean") {
    throw new ApiError(400, "isRetailer must be a boolean");
  }

  // Check if user already exists
  const isExistingUser = await User.findOne({
    $or: [{ email }, { phone }],
  });

  if (isExistingUser) {
    throw new ApiError(409, "User with this email or phone already exists");
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
    isRetailer,
    phone,
  });

  // Remove sensitive fields before sending response
  const userSafe = await User.findById(user._id).select("-password -refreshToken");

  if (!userSafe) {
    throw new ApiError(500, "Failed to retrieve user after registration");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, userSafe, "User registered successfully"));
});

// LOGIN CONTROLLER
const loginUser = asyncHandler(async (req, res) => {

let user;
const {otp} = req.body
if(otp)
{


const {email} = req.body

if(!email)
{
 

  throw new ApiError(400,"Email is required for the otp verification")


}
   user = await User.findOne({email});



   if(!user)
   {
    throw new ApiError(404,"This user does not exists")
   }











if(!  verifyOtp(email,otp)
)
{
  throw new ApiError(400,"The otp is incorrect")
}


 
}
else
{



  const { emailOrPhone, password } = req.body;

  if (
    !emailOrPhone ||
    String(emailOrPhone).trim() === "" ||
    !password ||
    password.trim() === ""
  ) {
    throw new ApiError(400, "Email/Phone and password are required");
  }

  let email = null;
  let phone = null;

  // Identify login type (email or phone)
  if (/^\d{10}$/.test(emailOrPhone.trim())) {
    phone = emailOrPhone.trim();
  } else if (/\S+@\S+\.\S+/.test(emailOrPhone.trim())) {
    email = emailOrPhone.trim().toLowerCase();
  } else {
    throw new ApiError(400, "Invalid email or phone format");
  }

     user = await User.findOne({ $or: [{ email }, { phone }] });

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isPasswordCorrect = await user.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Incorrect password");
  }




}

  const { refreshToken, accessToken } = await generateAccessAndRefreshToken(user._id);

  const userSafe = await User.findById(user._id).select("-password -refreshToken");

  return res
    .status(200)
    .cookie("refreshToken", refreshToken,options)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, userSafe, "Login successful"));
});
const logoutUser = asyncHandler(async(req,res)=>{

  const userId = req.user?._id




  const user = await User.findByIdAndUpdate(userId,{
    $set:{
      refreshToken:undefined
    }
  },{
    new:true,
    runValidators:true
  })



//  const options = {
//   httpOnly:true,
//   secure:true

//  }

return res.status(202)
.clearCookie("accessToken",options)
.clearCookie("refreshToken",options)
.json(
  new ApiResponse(200,{},"User logged out successfully")
)





})
const updateProfile = asyncHandler( async(req,res)=>{
 
const userId = req.user?._id

   

const updates  = {}

const {name,email,otp,phone} = req.body

if(email && /\S+@\S+\.\S+/.test(email)   )
{
   
  // will check for the otp
   const hashedOtp = await redisClient.get(`otp:data:${email}`)
 if(!hashedOtp)
 {
  throw new ApiError(404,"The  OTP is expired or not found")
 }

const isVerified = await bcrypt.compare(otp,hashedOtp)


 if(isVerified){
 
 updates.email = email
    
 }
 else{
  throw new ApiError(400,"Soory the email is not verified yet")
 }
}
if( name &&  name.trim() !== ""  )
{
  updates.name = name
}

if(/^\d{10}$/.test(phone))
{
  updates.phone = phone
}




const user = await User.findByIdAndUpdate(userId,{
  $set:updates
},{
  new:true,
  runValidators:true
}).select("-password -refreshToken")



return res
.status(200)
.json(
  new ApiResponse(200,user,"The data updated successfully")
)
})
const changePassword = asyncHandler(async(req,user)=>{


const {emailOrPhone} = req.body
const loginedUserEmail = req.user?.email


if(emailOrPhone)
{
  let email = null;
  let phone = null;

  if (/^\d{10}$/.test(emailOrPhone.trim())) {
    phone = emailOrPhone.trim();
  } else if (/\S+@\S+\.\S+/.test(emailOrPhone.trim())) {
    email = emailOrPhone.trim().toLowerCase();
  } else {
    throw new ApiError(400, "Invalid email or phone format");
  }

  const user = await User.findOne({
    $or:[{email,phone}]
  })


  if(!user)
  {
    throw new ApiError(400,"The user does not exists")
  }


const hashedOtp = await redisClient.get(`otp:data:${loginedUserEmail}`)

if(!hashedOtp)
{
  throw new ApiError(400,"The otp not found or expired")
}

const isVerified = await bcrypt.compare()








}


if(loginedUserEmail)
{

const {oldPassword,newPassword} = req.body;


const otp = req.body.trim();
  

if(!otp)
{
 throw new ApiError(400,"Please enter the OTP to verify");
}








}
































})
const refreshAccessToken = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
    console.log("refreshing url is hitted with this incoming",token)
  if (!token) {
    throw new ApiError(400, "Refresh token is missing or expired");
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  const user = await User.findById(decodedToken._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.refreshToken !== token) {
    throw new ApiError(403, "Refresh token doesn't match our records");
  }

  // Generate new access and refresh tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

  // Save new refresh token to DB


  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, { accessToken, refreshToken }, "Token refreshed successfully")
    );
});
const getCurrentUser = asyncHandler(async(req,res)=>{

 const userId = req.user?._id


   const user = await User.findById(userId).select("-password -refreshToken")






return res
.status(201)
.json(
  new ApiResponse(200,user,"User fetched successfully")
)




})




export { registerUser, loginUser,logoutUser,refreshAccessToken,getCurrentUser };
