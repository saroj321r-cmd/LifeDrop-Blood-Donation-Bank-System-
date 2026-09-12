const express=require("express"),r=express.Router(),c=require("../controller/donorController"),{auth}=require("../middleware/auth");
r.get("/dashboard",auth,c.dashboard);r.post("/register",auth,c.registerDonor);r.post("/donation",auth,c.recordDonation);module.exports=r;
