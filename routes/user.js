const express=require("express")
const router=express.Router()
const{handleUserSignup,handleUserlogin}=require("../controller/user")

//router for signup
router.post('/',handleUserSignup)
router.post('/login',handleUserlogin)

module.exports=router