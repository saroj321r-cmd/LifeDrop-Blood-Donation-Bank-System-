const mongoose=require("mongoose");
const schema=new mongoose.Schema({
 donor:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},bloodGroup:{type:String,required:true},
 units:{type:Number,default:1,min:1},donationDate:{type:Date,default:Date.now},location:{type:String,default:""}
},{timestamps:true}); module.exports=mongoose.model("Donation",schema);
