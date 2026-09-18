 const mongoose=require("mongoose")

 const urlSchema=new  mongoose.Schema({
    shortid:{
        type:String,
        required:true,
        unique:true,
    },
    redirectURL:{
        type:String,
        required:true,
    },
    visitHistory:[{timestamp:{type:Number}}],//arr of objects
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    }
 },{timestamps:true})//this is feature provided by moongoose which tell to add date and time field to every document

 const Url=mongoose.model('url',urlSchema)//Create a Mongoose Model named Url using the urlSchema, and store that model in the Url variable.

 module.exports=Url


