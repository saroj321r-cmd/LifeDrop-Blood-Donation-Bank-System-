const express=require("express"),r=express.Router(),c=require("../controller/requestController"),{auth}=require("../middleware/auth");
r.get("/create",auth,c.showCreate);r.post("/create",auth,c.createRequest);r.get("/my",auth,c.myRequests);module.exports=r;
