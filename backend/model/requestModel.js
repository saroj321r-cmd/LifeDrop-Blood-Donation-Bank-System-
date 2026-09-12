const mongoose=require("mongoose");
const schema=new mongoose.Schema({
 requester:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
 patientName:{type:String,required:true},hospitalName:{type:String,required:true},
 bloodGroup:{type:String,required:true},unitsRequired:{type:Number,required:true,min:1},
 urgency:{type:String,enum:["Normal","Urgent","Emergency"],default:"Normal"},
 reason:{type:String,default:""},status:{type:String,enum:["Pending","Approved","Rejected","Fulfilled"],default:"Pending"}
},{timestamps:true}); module.exports=mongoose.model("Request",schema);
