const express=require("express");
const URL = require("../modules/url");

const router=express.Router();

router.get("/",async (req,res)=>{
    try {
        if(!req.user) return res.redirect('/login')
        const allurls=await URL.find({createdBy:req.user._id})
        return res.render("home",{
            urls:allurls,
        })
    } catch (err) {
        console.error("Error fetching URLs:", err.message);
        return res.render("home", {
            urls: [],
        })
    }
})
router.get('/signup',(req,res)=>{
    return res.render('signup')
})
router.get('/login',(req,res)=>{
    return res.render('login')
})

module.exports=router;