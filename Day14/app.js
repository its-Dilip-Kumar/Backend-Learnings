const express=require("express");
const app=express();
const main=require("./database");
const User=require("./Modules/user")
const validateUser=require("./utils/validateUser")


app.use(express.json());


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


        await User.create(req.body);
        res.send("Registration Successful");
    }catch(e){
        res.send("Erro"+e.message);
    };
})


app.get("/feed",async (req,res)=>{
    try{
        const result=await User.find({});
        res.send(result);
    }catch(e){
        res.send("Error"+e.message);
    }
})

app.get("/user/:id",async (req,res)=>{
    try{
        const result=await User.findById(req.params.id);
        res.send(result);
    }catch(e){
        res.send("Error"+e.message);
    }
})

app.delete("/user/:id",async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.send("Success!")
    }
    catch(e){
        res.send("Error"+e.message);
    }
})

app.patch("/user",async(req,res)=>{
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