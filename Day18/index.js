const express=require("express");
const app=express();
const { Server } =require("socket.io");
const http=require("http");


const server=http.createServer(app); 
const io=new Server(server);  //socket.io server


io.on("Connection",(socket)=>{
    socket.on("message",(data)=>{
        io.emit("new-message",data);
    })

    socket.on("disconnect",()=>{
        console.log("Disconnected from server");
    })
})

server.listen(3000,()=>{
    console.log("Listening at port 3000")
})


// const server=app.listen(3000,()=>{
//     console.log("Listening at port 3000");
// })

// const io=new Server(server);

