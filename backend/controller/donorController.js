const User=require("../model/userModel"),Donor=require("../model/donorModel"),Donation=require("../model/donationModel"),Blood=require("../model/bloodModel");
const dashboard=async(req,res)=>{try{
 const user=await User.findById(req.user.userId),donor=await Donor.findOne({user:req.user.userId}),donations=await Donation.find({donor:req.user.userId}).sort({donationDate:-1});
 res.render("donor/dashboard",{user,donor,donations});
}catch(e){console.log(e);res.status(500).render("error",{message:"Could not load donor dashboard."});}};
const registerDonor=async(req,res)=>{try{
 const {bloodGroup,age,gender,city,isAvailable}=req.body;
 await Donor.findOneAndUpdate({user:req.user.userId},{user:req.user.userId,bloodGroup,age,gender,city,isAvailable:isAvailable==="on"},{upsert:true,new:true,setDefaultsOnInsert:true});
 await User.findByIdAndUpdate(req.user.userId,{bloodGroup,city,isDonor:true});res.redirect("/donor/dashboard");
}catch(e){console.log(e);res.status(500).render("error",{message:"Could not register donor."});}};
const recordDonation=async(req,res)=>{try{
 const donor=await Donor.findOne({user:req.user.userId});if(!donor)return res.status(400).render("error",{message:"Please register as a donor first."});
 const units=Number(req.body.units)||1;await Donation.create({donor:req.user.userId,bloodGroup:donor.bloodGroup,units,location:req.body.location});
 donor.lastDonationDate=new Date();donor.totalDonations+=units;await donor.save();
 await Blood.findOneAndUpdate({bloodGroup:donor.bloodGroup},{$inc:{unitsAvailable:units}},{upsert:true,new:true,setDefaultsOnInsert:true});
 res.redirect("/donor/dashboard");
}catch(e){console.log(e);res.status(500).render("error",{message:"Could not record donation."});}};
module.exports={dashboard,registerDonor,recordDonation};
