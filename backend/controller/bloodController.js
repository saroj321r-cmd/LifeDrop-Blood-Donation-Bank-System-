const Blood=require("../model/bloodModel");
const groups=["A+","A-","B+","B-","AB+","AB-","O+","O-"];
const inventory=async(req,res)=>{try{
 for(const bloodGroup of groups)await Blood.findOneAndUpdate({bloodGroup},{$setOnInsert:{bloodGroup,unitsAvailable:0,lowStockLimit:5}},{upsert:true});
 res.render("blood/inventory",{blood:await Blood.find().sort({bloodGroup:1})});
}catch(e){console.log(e);res.status(500).render("error",{message:"Could not load blood inventory."});}};
module.exports={inventory};
