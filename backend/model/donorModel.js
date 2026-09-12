const mongoose=require("mongoose");
const schema=new mongoose.Schema({
 user:{type:mongoose.Schema.Types.ObjectId,ref:"User",unique:true,required:true},
 bloodGroup:{type:String,required:true},age:{type:Number,required:true,min:18,max:65},
 gender:{type:String,default:""},city:{type:String,default:""},lastDonationDate:{type:Date,default:null},
 totalDonations:{type:Number,default:0},isAvailable:{type:Boolean,default:true}
},{timestamps:true}); module.exports=mongoose.model("Donor",schema);
