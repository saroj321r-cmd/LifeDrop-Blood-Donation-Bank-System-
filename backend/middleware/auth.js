const jwt=require("jsonwebtoken");
const auth=(req,res,next)=>{
 try{
  const h=req.headers.authorization||req.headers.Authorization; let token;
  if(h&&h.startsWith("Bearer ")) token=h.split(" ")[1];
  else if(req.cookies&&req.cookies.token) token=req.cookies.token;
  if(!token){
   if(req.accepts("html")) return res.redirect("/auth/login");
   return res.status(401).json({success:false,message:"Access denied. No token provided (via Bearer header or cookie)."});
  }
  req.user=jwt.verify(token,process.env.JWT_SECRET); next();
 }catch(error){
  if(req.accepts("html")){res.clearCookie("token");return res.redirect("/auth/login");}
  if(error.name==="TokenExpiredError") return res.status(401).json({success:false,message:"Token has expired. Please login again."});
  return res.status(401).json({success:false,message:"Invalid token. Authentication failed."});
 }
};
const authorizeRoles=(...roles)=>(req,res,next)=>{
 if(!req.user||!req.user.role) return res.status(401).json({success:false,message:"Unauthorized: User information not found."});
 if(!roles.includes(req.user.role)){
  if(req.accepts("html")) return res.status(403).render("error",{message:"You do not have permission to access this page."});
  return res.status(403).json({success:false,message:`Access denied. Role '${req.user.role}' is not authorized.`});
 }
 next();
};
module.exports=auth;module.exports.auth=auth;module.exports.authorizeRoles=authorizeRoles;
