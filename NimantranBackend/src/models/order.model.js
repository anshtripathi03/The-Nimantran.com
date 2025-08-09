import mongoose, { mongo, Schema } from "mongoose"
const orderSchema = new mongoose.Schema({
 
  orderId:{
    type:String,
    required:true,
    unique:true
  },
  products:[
  {
    type:Schema.Types.ObjectId,
    ref:"Product"

  }



  ],
  status:{
    type:String,
    required:true
  },
  totalAmount:{
    type:Number,
    required:true

  },
  paymentMethod:{
    type:String,
    required:true
  },
paymentStatus:{
  type:String,
  required:true
},
trackingId:{
  type:String,
  required:true
}







},{
  timestamps:true
}) 

export const Order = new mongoose.model("Order",orderSchema)