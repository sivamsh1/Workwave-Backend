import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email:String,
  password:String,  
})


const adminModal =  mongoose.model("admin",adminSchema,"admin") ;

export default adminModal;