const Request=require("../model/requestModel");
const showCreate=(req,res)=>res.render("requests/create");
const createRequest=async(req,res)=>{try{
 const {patientName,hospitalName,bloodGroup,unitsRequired,urgency,reason}=req.body;
 await Request.create({requester:req.user.userId,patientName,hospitalName,bloodGroup,unitsRequired:Number(unitsRequired),urgency,reason});
 res.redirect("/requests/my");
}catch(e){console.log(e);res.status(500).render("error",{message:"Could not create blood request."});}};
const myRequests=async(req,res)=>{try{
 res.render("requests/my",{requests:await Request.find({requester:req.user.userId}).sort({createdAt:-1})});
}catch(e){console.log(e);res.status(500).render("error",{message:"Could not load your requests."});}};
module.exports={showCreate,createRequest,myRequests};
