const URL=require('../modules/url')
const { nanoid }=require("nanoid")

//nanoid library to generate shorturl
async function handlegenerateShortUrl(req,res){
    const body=req.body
    if(!body.url) return res.status(400).json({error:'url is required'})
    const shortid=nanoid(8);
    try {
        await URL.create({
            shortid:shortid,
            redirectURL:body.url,
            visitHistory:[],
            createdBy:req.user._id,
        })
        const allurls = await URL.find({});
        return res.render('home',{
            id:shortid,
            urls:allurls,
        })
    } catch (err) {
        console.error("Error generating short URL:", err.message);
        return res.status(500).send("Database error: " + err.message);
    }
}
async function handlegetAnalytics(req,res){
    const shortid=req.params.shortid
    const result=await URL.findOne({shortid})
    return res.json({
        totalclick:result.visitHistory.length,
         analytics:result.visitHistory,
        })
}

module.exports={
    handlegenerateShortUrl,
    handlegetAnalytics,
}