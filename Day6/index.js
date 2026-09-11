const express=require("express");
const app=express();

// app.use((req,res)=>{
//     res.send("I am Dilip Sharma");
// }) //reply from the server

// app.use((req,res)=>{
//     res.send({"name":"Dilip", "age":22});
// })

app.use("/about",(req,res)=>{
    res.send("I am your about page");
})

app.use("/home",(req,res)=>{
    res.send("I am your home page");
})

app.use("/detail",(req,res)=>{
    res.send("I am your detail page");
})

app.use("/contact",(req,res)=>{
    res.send("I am your contact page");
})

app.use("/",(req,res)=>{
    res.send("I am Default Page");
})

app.listen(4000,()=>{
    console.log("I am listening at 4000 port");
})