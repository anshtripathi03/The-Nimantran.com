import mongoose, { Schema } from "mongoose";



const addressInfoSchema =  new mongoose.Schema({

 name:{
  type:String,
  lowercase:true,
  trim:true,
  required:true
 },
 phone:{
  type:String,
  required:true,
  trim:true
 },
 alternatePhone:{
  type:String,
  trim:true
 },
 state:{
  type:String,
  required:true,
  trim:true
 },
 city:{
  type:String,
  required:true,
  trim:true
 },
 roadAreaColony:{
  type:String,
  required:true,
  trim:true
 },
 pincode:{
  type:String,
  required:true
 },
 landmark:{
  type:String,
  trim:true,
 },
 typeOfAddress:{
type: String,
    trim: true,
    lowercase: true,



 }


















})

const addressSchema = new mongoose.Schema({
 
  userId:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  addresses:[
    
    addressInfoSchema
  ]




},{
  timestamps:true
})

export const Address = new mongoose.model("Address",addressSchema)