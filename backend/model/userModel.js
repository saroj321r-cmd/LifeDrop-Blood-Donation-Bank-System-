const mongoose=require("mongoose");
const schema=new mongoose.Schema({
 name:{type:String,required:true,trim:true},email:{type:String,required:true,unique:true,lowercase:true,trim:true},
 password:{type:String,required:true},phone:{type:String,default:""},
 role:{type:String,enum:["user","admin"],default:"user"},
 bloodGroup:{type:String,enum:["A+","A-","B+","B-","AB+","AB-","O+","O-"],default:null},
 city:{type:String,default:""},isDonor:{type:Boolean,default:false}
},{timestamps:true});
module.exports=mongoose.model("User",schema);
