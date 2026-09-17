const jwt = require('jsonwebtoken');
const User=require("../Modules/user")



const userAuth=async (req,res,next)=>{
    try{
        //validate the user first
        const {token}=req.cookies;
        if(!token){
            throw new Error("Token Does't exits");
        }

        const payload=jwt.verify(token,"Rohit@123");
        // console.log(payload);

        const {_id}=payload;
        if(!_id){
            throw new Error("Id is missing");
        }
        const result=await User.findOne({_id:_id});

        if(!result){
            throw new Error("User does't exits");
        }
        req.result=result;

        next();
    }catch(e){
        res.send("Error "+e.message);
    }
}

module.exports=userAuth;