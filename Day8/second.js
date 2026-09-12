const express=require('express');
const app=express();


// app.use("/user",(req,res,next)=>{
//     console.log("I am First");
//     next();
// },(req,res,next)=>{
//     console.log("I am Second");
//     next();
// },(req,res,next)=>{
//     console.log("I am Third");
//     res.send("Request Handler");
// })

// app.use("/user",(req,res,next)=>{
//     console.log("I am First");
//     next();
// })
// app.use("/user",(req,res,next)=>{
//     console.log("I am Second");
//     next();
// })

// app.use("/user",(req,res,next)=>{
//     console.log("I am Third");
//     res.send("Request Handler");
// })



app.use("/user",(req,res,next)=>{
    console.log(`${Date.now()} ${req.method} ${req.url}`);
    next();
})

app.get("/user",(req,res)=>{
    res.send("Info about user")
})

app.post("/user",(req,res)=>{
    res.send("Info saved")
})

app.delete("/user",(req,res)=>{
    res.send("Info deleted")
})



app.listen(4000,()=>{
    console.log("Listening at 4000 port");
})
