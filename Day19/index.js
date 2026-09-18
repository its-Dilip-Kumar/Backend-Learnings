const express=require("express");
const app=express();
const {Server}=require("socket.io");
const http=require("http");
const path=require("path");


const server=http.createServer(app);
const io=new Server(server);


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
}); //index.html file ko ab backend serve karega

io.on("connection",(socket)=>{

    // socket.on('message',(data)=>{
    //     // io.emit('new-message',data); //ye sbko broadcast karta hai msg jisne bheja hai usko bhi jayega
    //     socket.broadcast.emit('new-message',data); //agr aap chahte ho ki baakiyo ko jaaye lekin mujhe naa aaye 
    // })


    socket.on('message',({room,msg})=>{
        // io.to(room).emit('new-message',msg); //ise msg sbke pass jayega even mere pass bhi 
        socket.to(room).emit('new-message',msg); //ise msg mere pass nhi ayega jo mene bheja hai waki sbke pass jayega
    })

    socket.on('join-room',(room)=>{ //iski help se tum room join kr skte ho 
        socket.join(room)
    })
    
    socket.on("disconnected",()=>{
        console.log("Disconnection from the server");
    })

})




server.listen(3000,()=>{
    console.log("listening at port 3000")
})


