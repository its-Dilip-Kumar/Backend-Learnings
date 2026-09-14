const express=require("express");
const app=express();
const main=require("./database");
const User=require("./models/documentInfo")


app.use(express.json());


app.get("/info",async (req,res)=>{
    const total=await User.find({});
    res.send(total)
})

app.post("/info",async (req,res)=>{
    await User.create(req.body);
    res.send("Document created Successfully");
})

app.put("/info",async (req,res)=>{
    await User.updateOne(req.body);
    res.send("Done");
})

app.delete("/info",async (req,res)=>{
    await User.deleteOne({name:"Pappu"})
    res.send("Deleted Successfully");
})








main()
.then(async ()=>{
    console.log("Connected to DB")
    app.listen(4000,()=>{
    console.log("Listening at port 4000");
})
const ans=await User.find({}); //jab saare document find ko dekhna ho to 
console.log(ans);

})
.catch((e)=>console.log(e));
