const express=require("express");
const app=express();
const main=require("./database");
const User=require("./Modules/user")
const validateUser=require("./utils/validateUser")
const bcrypt=require("bcrypt");
const { isJWT } = require("validator");
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const userAuth=require("./middleware/userAuth")


app.use(express.json());
app.use(cookieParser());


app.post("/register",async(req,res)=>{
    try{


        // //from here 

        // const mandatoryField=["firstName","lastName","age"];
        // const isAllowed=mandatoryField.every((keys)=>Object.keys(req.body).includes(keys));
        // if(!isAllowed){
        //     throw new Error("Fields Missing");
        // }


        // //to here -> this is API level validation 

        //hum isko idhr bhi likh skte hai lekin yaha hum neat and clean code likhna chahte hai isliye hum isko dusri 
        //file bna kr paste kr denge or idhr import krva denge


        validateUser(req.body);

        req.body.password=await bcrypt.hash(req.body.password,10);  //this line convert password into hash


        await User.create(req.body);
        res.send("Registration Successful");
    }catch(e){
        res.send("Erro"+e.message);
    };
})

app.post("/login",async (req,res)=>{
    const people=await User.findOne({emailId:req.body.emailId});

    // if(!(req.body.emailId===people.emailId)){
    //     throw new Error("Invalid credentials");
    // }

    const isAllowed=bcrypt.compare(req.body.password,people.password);
    if(!(isAllowed)){
        throw new Error("Invalid Credentials")
    }

    //jwt token
    const token=jwt.sign({_id:people._id,emailId:people.emailId},"Rohit@123",{expiresIn:100});
    res.cookie("token",token);
    res.send("login successfully");
})


app.get("/feed",userAuth,async (req,res)=>{
    try{
        // console.log(req.cookies);
        res.send(req.result);
    }catch(e){
        res.send("Error"+e.message);
    }
})

app.get("/user",userAuth,async (req,res)=>{
    try{

        // const payload=jwt.verify(req.cookies.token,"Rohit@123");
        // console.log(payload);
        // const result=await User.findById(payload._id);
        res.send(req.result);
    }catch(e){
        res.send("Error"+e.message);
    }
})

app.delete("/user/:id",userAuth,async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.send("Success!")
    }
    catch(e){
        res.send("Error"+e.message);
    }
})

app.patch("/user",userAuth,async(req,res)=>{
    try{
        const {_id,...update}=req.body;
        await User.findByIdAndUpdate(_id,update,{"runValidators":true});
        res.send("Done!");
    }catch(e){
        res.send("Error"+e.message);
    }
})


main()
.then(()=>{
    console.log("Connected to DB")
    app.listen(4000,()=>{
        console.log("Listening at 4000 port")
    })
}).catch((e)=>console.log(e));