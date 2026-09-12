const bcrypt=require("bcryptjs"),jwt=require("jsonwebtoken"),User=require("../model/userModel");
const makeToken=u=>jwt.sign({userId:u._id,name:u.name,email:u.email,role:u.role},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN||"1d"});
const setCookie=(res,t)=>res.cookie("token",t,{httpOnly:true,sameSite:"lax",secure:false,maxAge:86400000});
const showLogin=(req,res)=>res.render("auth/login",{error:null});
const showRegister=(req,res)=>res.render("auth/register",{error:null});
const showForgotPassword=(req,res)=>res.render("auth/forgot-password");
const register=async(req,res)=>{try{
 const {name,email,password,phone,bloodGroup,city}=req.body;
 if(!name||!email||!password)return res.render("auth/register",{error:"Name, email and password are required."});
 if(await User.findOne({email}))return res.render("auth/register",{error:"Email is already registered."});
 const user=await User.create({name,email,password:await bcrypt.hash(password,10),phone,bloodGroup,city,role:"user"});
 setCookie(res,makeToken(user));res.redirect("/donor/dashboard");
}catch(e){console.log(e);res.status(500).render("auth/register",{error:"Registration failed."});}};
const login=async(req,res)=>{try{
 const {email,password}=req.body,user=await User.findOne({email});
 if(!user||!(await bcrypt.compare(password,user.password)))return res.render("auth/login",{error:"Invalid email or password."});
 setCookie(res,makeToken(user));res.redirect(user.role==="admin"?"/admin/dashboard":"/donor/dashboard");
}catch(e){console.log(e);res.status(500).render("auth/login",{error:"Login failed."});}};
const logout=(req,res)=>{res.clearCookie("token");res.redirect("/auth/login");};
module.exports={showLogin,showRegister,showForgotPassword,register,login,logout};
