const express=require("express");
const app=express();
const main=require("./aichat")
app.use(express.json());

const chattingHistory={};

app.post("/chat",async(req,res)=>{
    const {id,msg}=req.body;
    if(!chattingHistory[id]){
        chattingHistory[id]=[];
    }

    const History=chattingHistory[id];

    const promptMessage=[...History,{
        role:"user",
        parts:[{text:msg}]
    }];

    const answer=await main(promptMessage);

    History.push({role:"user",parts:[{text:msg}]});
    History.push({role:"model",parts:[{text:answer}]});

    res.send(answer);



})



app.listen(4000,()=>{
    console.log("Listening at port 4000");
})