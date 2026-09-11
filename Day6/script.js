const express=require("express");
const app=express();

app.use((req,res)=>{
    res.send("I am Dilip Sharma");
});

app.listen(4000,()=>{
    console.log("I am listening at 4000 port")
})