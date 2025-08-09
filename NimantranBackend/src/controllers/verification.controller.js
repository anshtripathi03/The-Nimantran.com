import asyncHandler from "../utils/asyncHandler.js";
import { redisClient } from "../middlewares/otp.middleware.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../utils/sendMail.js";

// OTP Generator
export const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const verifyOtp = async(email,otp)=>{


const hashedOtp =await redisClient.get(`otp:data:${email}`)



const isOtpCorrect = bcrypt.compare(otp,hashedOtp)

return isOtpCorrect 


}


const sendOTP = asyncHandler(async (req, res) => {
  const OTP_EXPIRY = 5 * 60; // 5 minutes
  const RATE_LIMIT = 100;      // Max 3 OTPs per hour
  const RESEND_LIMIT = 60;   // 1 minute cooldown
 console.log("I am the body",req.body)
  const email = req.body?.email || req.user?.email;
  console.log(email)
  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  const now = Date.now();

  // 1. Resend cooldown check
  const lastSent = await redisClient.get(`otp:lastSent:${email}`);
  if (lastSent && now - parseInt(lastSent) < RESEND_LIMIT * 1000) {
    throw new ApiError(429, "Please wait before requesting another OTP.");
  }

  // 2. Rate limit per hour
  const sentCount = await redisClient.get(`otp:count:${email}`);
  if (sentCount && parseInt(sentCount) >= RATE_LIMIT) {
    throw new ApiError(429, "OTP limit exceeded. Try again after 1 hour.");
  }

  // 3. Generate and hash OTP
  const otp = generateOTP();
  const hashedOtp = await bcrypt.hash(otp, 10);

  // 4. Store hashed OTP with expiry (Upstash uses `set` with options)
  await redisClient.set(`otp:data:${email}`, hashedOtp, { ex: OTP_EXPIRY });

  // 5. Store last sent timestamp
  await redisClient.set(`otp:lastSent:${email}`, now.toString(), { ex: RESEND_LIMIT });

  // 6. Track OTP request count (increment + set expiry)
  // await redisClient.incr(`otp:count:${email}`);
  await redisClient.expire(`otp:count:${email}`, 10); // expire in 1 hour

  // 7. Send email
  await sendEmail(email, "Your OTP for Email Verification", `Your OTP is: ${otp}`);

  // 8. Respond
  return res.status(202).json(
    new ApiResponse(200, {}, "OTP has been sent successfully")
  );
});
const checkOtp = asyncHandler(async(req,res)=>{


  const {email,otp} = req.body 

if(!/^\S+@\S+\.\S+$/.test(email))
{
   throw new ApiError(400,"Please provide a valid email")

}

  if(!otp)
  {
    throw new ApiError(400,"Please provide the email and the otp")
  }

 const isCorrect = await verifyOtp(email,otp)







console.log(isCorrect)



return res.status(200)
.json(
  new ApiResponse(200,{isCorrect},"Otp checked ")
)






})

export { sendOTP,verifyOtp, checkOtp};
