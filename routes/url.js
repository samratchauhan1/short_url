 const express=require("express")

 const {handlegenerateShortUrl,handlegetAnalytics}=require("../controller/url")
 const router=express.Router()


 
 router.post('/',handlegenerateShortUrl)
 //analytic route kitne baje kitne click hue hai ye bbatana hai uske iye route

 router.get('/analytics/:shortid',handlegetAnalytics

 )

 module.exports=router