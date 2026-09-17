const jwt=require("jsonwebtoken");
const User=require("../modules/user")
require('dotenv').config()

const UserAuth=async (req,res,next)=>{
    try{
    const {token}=req.cookies;
    if(!token){
        throw new Error("Token does not exist");
    }
    const payload=jwt.verify(token,process.env.SECRET_KEY);

    const {_id}=payload;
    if(!_id){
        throw new Error("Id is missing");
    }

    const result=await User.findOne({_id:_id});
    if(!result){
        throw new Error("User does not exists");
    }

    req.result=result;
    next();
}catch(e){
    res.send("Error: "+e.message);
}
}

module.exports=UserAuth;