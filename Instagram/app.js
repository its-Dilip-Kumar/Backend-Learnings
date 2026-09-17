const express=require("express");
const app=express();
const main=require("./database");
const User=require("./modules/user");
const bcrypt=require("bcrypt");
const validateUser=require("./utils/validateUser")
const jwt=require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userAuth=require("./middleware/userAuth");
const redisClient=require("./config/redis");
require('dotenv').config()

app.use(express.json());
app.use(cookieParser()); 

app.post("/register",async(req,res)=>{
    try{
        validateUser(req.body);
        req.body.password=await bcrypt.hash(req.body.password,10);
        await User.create(req.body);
        res.send("Register Successfully");
    }catch(e){
        throw new Error("Error: "+e.message);
    }
})

app.post("/login",async(req,res)=>{
    try{
        const people=await User.findOne({emailId:req.body.emailId});
        const isAllowed=await bcrypt.compare(req.body.password,people.password);
        if(!isAllowed){
            throw new Error("Invalid Credentials");
        }
        const token = jwt.sign({_id:people._id,emailId:people.emailId},process.env.SECRET_KEY,{expiresIn:100});
        res.cookie("token",token);
        res.send("Login Successfully");
    }catch(e){
        res.send("Error: "+e.message);
    }
})

app.get("/info",userAuth,async (req,res)=>{
    try{
        // console.log(req.cookies.token);
        // const payload=jwt.verify(req.cookies.token,process.env.SECRET_KEY);
        // console.log(payload);
        const myId=await User.findById(req.result);
        res.send(myId);
    }catch(e){
        res.send("Error: "+e.message);
    }
})

app.delete("/user",userAuth,async(req,res)=>{
    try{
        // const payload=jwt.verify(req.cookies.token,process.env.SECRET_KEY);
        await User.findByIdAndDelete(req.result);
        res.send("Deleted Successfully");
    }catch(e){
        res.send("Error: "+e.message);
    }
})

app.patch("/user",userAuth,async(req,res)=>{
    try{
        // const payload=jwt.verify(req.cookies.token,process.env.SECRET_KEY);
        const {_id,...update}=req.body;
        await User.findByIdAndUpdate(_id,update,{runValidators:true});
        res.send("Details Updated");
    }catch(e){
        res.send("Error: "+e.message);
    }
})

//logout - solution number - 01

// app.post("/logout",(req,res)=>{
//     try{
//         res.cookie("token","Chala ja bsdke");
//         res.send("Logout Successfully");
//     }catch(e){
//         res.send("Error: "+e.message);
//     }
// })

//logout- solution - 02
// app.post("/logout",(req,res)=>{
//     try{
//         res.cookie("token",null,{expires:new Date(Date.now())});
//         res.send("Logout Successfully");
//     }catch(e){
//         res.send("Error: "+e.message);
//     }
// })

//logout - solution - 03 -- final industry level solution
app.post("/logout",userAuth,async(req,res)=>{
    try{
        const {token}=req.cookies;
        // console.log(token);
        const payload=jwt.decode(token);
        // console.log(payload);
        await redisClient.set(`token:${token}`,"Blocked");
        await redisClient.expireAt(`token:${token}`,payload.exp);
        res.cookie("token",null,{expires:new Date(Date.now())});
        res.send("Logout Successfully");
    }catch(e){
        res.send("Error: "+e.message);
    }
})



// main()
// .then(()=>{
//     app.listen(3000,()=>{
//     console.log("Listening at port 3000");
// })
// }).catch((e)=>console.log(e))

const InitializeConnection=async()=>{
    try{
        await redisClient.connect();
        console.log("Connected to Redis");

        await main();
        console.log("Connected to MongoDB");

        app.listen(3000,()=>{
            console.log("Listening at port 3000");
        })
    }catch(e){
        console.log("Error: "+e.message);
    }
}

InitializeConnection();