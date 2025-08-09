import { Address } from "../models/address.model.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";




const addNewAdress = asyncHandler(async(req,res)=>{


const { name,phone,alternatePhone,state,city,roadAreaColony,pincode,landmark,typeOfAddress } = req.body
const userId = req.user?._id






if(!userId)
{
  throw new ApiError(400,"Please login first")
}

if( ['name','phone','state','city','roadAreaColony','pincode'].some((feild)=> (!feild || feild.trim() ===""))              )

{
 throw new ApiError(400,"All necessary feilds are required")
}

if(! /^\d{6}$/.test(pincode))
{  throw new ApiError(400,"Pincode is not valid")


}
if(! /^\d{10}$/.test(phone))
{  throw new ApiError(400,"phone is not valid")


}


if(alternatePhone  &&  !/^\d{10}$/.test(alternatePhone))

{


throw new ApiError(400,"The phone number is not valid")

}


const userAddress = await Address.findOne({userId})

if(userAddress)
{

  

  userAddress.addresses.push({
     name,
   phone,
   alternatePhone,
   state,
   city,
   roadAreaColony,
   pincode,
   landmark,
   typeOfAddress
  })


  userAddress.save()





}









const address = await Address.create(
  
{


   userId,
   addresses:[
      {
   name,
   phone,
   alternatePhone,
   state,
   city,
   roadAreaColony,
   pincode,
   landmark,
   typeOfAddress
      }

   ]






}
  
  
)



if(!address)
{

  throw new ApiError(500,"Something went wrong while creating the address")


}


return res.status(202)
.json(
  new ApiResponse(200,address,"Address added successfully")
)


})
const getAddresses = asyncHandler(async(req,res)=>{

const userId = req.user?._id


if(!userId)
{
  throw new ApiError(400,"Please login first")
}




const addresses = await Address.findOne({userId})






if(!addresses)
{
  throw new ApiError(400,"No addresses has been found ")
}

return res.status(202)
.json(
  new ApiResponse(200,addresses,"Addresses fetched successfully")
)










})


export {addNewAdress,getAddresses}














