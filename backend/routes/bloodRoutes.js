const express=require("express"),r=express.Router(),c=require("../controller/bloodController"),{auth}=require("../middleware/auth");
r.get("/inventory",auth,c.inventory);module.exports=r;
