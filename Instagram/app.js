const express=require("express");
const app=express();
const main=require("./database");
const User=require("./modules/user");
const bcrypt=require("bcrypt");
const validateUser=require("./utils/validateUser")
const jwt=require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const userAuth=require("./middleware/userAuth");
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
        const token = jwt.sign({_id:people._id,emailId:people.emailId},process.env.SECRET_KEY,{expiresIn:10});
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



main()
.then(()=>{
    app.listen(3000,()=>{
    console.log("Listening at port 3000");
})
}).catch((e)=>console.log(e))