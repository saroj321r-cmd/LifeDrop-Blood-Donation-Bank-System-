const mongoose=require("mongoose");
const schema=new mongoose.Schema({
 bloodGroup:{type:String,unique:true,required:true,enum:["A+","A-","B+","B-","AB+","AB-","O+","O-"]},
 unitsAvailable:{type:Number,default:0,min:0},lowStockLimit:{type:Number,default:5,min:0}
},{timestamps:true}); module.exports=mongoose.model("Blood",schema);
