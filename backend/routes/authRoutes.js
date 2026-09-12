const express=require("express"),r=express.Router(),c=require("../controller/authController");
r.get("/login",c.showLogin);r.get("/register",c.showRegister);r.post("/register",c.register);r.post("/login",c.login);r.get("/logout",c.logout);r.get("/forgot-password",c.showForgotPassword);module.exports=r;
