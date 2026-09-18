const express=require("express");
const{ connectToMongodb }=require('./connection')
const URL=require('./modules/url')
const path=require("path")//builtin module
const{restricttoLoggedinUsersOnly,checkAuth}=require('./middleware/auth')
const cookieparser=require("cookie-parser")
//routes
const urlroute=require('./routes/url')
const staticRoute=require("./routes/staticRouter")
//have to register too that user route 
const userRoute=require("./routes/user")

const app=express();
const port=8001
connectToMongodb("mongodb://localhost:27017/short-url")
    .then(()=>console.log('mongodb connected'))
    .catch((err)=>console.log('MongoDB connection error:', err));


app.set("view engine","ejs")
app.set("views",path.resolve("./view"));

// jst example to undestand ejs
// app.get("/test",async(req,res)=>{
//     const allurls=await URL.find({});
//     return res.render('home',{
//         urls:allurls,
//         name:"piyush",
//     })//function jo batayega hame konsa view render krna hai
// })

app.use(express.json())
app.use(express.urlencoded({extended:false}))//to support form data
app.use(cookieparser())



app.use("/url",restricttoLoggedinUsersOnly,urlroute)//inline middleware ye middleware tb hi chalega jb hamari req /url pr ayegi
//here registering that user route
app.use('/user',userRoute)

app.use("/",checkAuth,staticRoute)

//dynamic route hame chahiye ki ham get kre short id se toh hamari jo link hai vo site open ho jaye

app.get('/url/:shortid',async(req,res)=>{
    const shortid=req.params.shortid;
    const entry=await URL.findOneAndUpdate({
        shortid
        //$push db ka update operator hai
    },{$push:{
        visitHistory:{
            timestamp:Date.now()},
    }})
    res.redirect(entry.redirectURL)
})

app.listen(port,()=>console.log(`server started at port ${port}`));