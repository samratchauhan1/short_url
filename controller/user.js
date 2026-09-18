const User=require("../modules/user")
const {v4:uuidv4}=require("uuid")
const{setUser}=require("../service/auth")


async function handleUserSignup(req,res){
const {name,email,password,gender}=req.body;
        await User.create({
            name,
            email,
            password,
            gender,
})
return res.render("home")//home is file name from view
}

async function handleUserlogin(req,res){
const {email,password}=req.body;
const user=await User.findOne({email,password})
if(!user) return res.render('login',{
    error:'Invalid username or Password',
})
const sessionid=uuidv4();
//The purpose is to remember that the user is logged in and then redirect them to the home page.
setUser(sessionid,user);
res.cookie("uid",sessionid)
return res.redirect('/')

return res.render("home")//redirect to home page
}

module.exports={
    handleUserSignup,
    handleUserlogin,
}