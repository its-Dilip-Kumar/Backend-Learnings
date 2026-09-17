const mongoose=require("mongoose");
const {Schema}=mongoose;

const userSchema=new Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20,
    },
    lastName:{
        type:String,
    },
    age:{
        type:Number,
        min:14,
        max:60
    },
    gender:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        immutable:true,
    },
    password:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        default:"This is Profile Picture"
    }

})

const user=mongoose.model("user",userSchema);
module.exports=user;