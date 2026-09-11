const http=require('http');
const server=http.createServer((req,res)=>{
    res.end("Hello I am Dilip Sharma");
})

server.listen(4000,()=>{
    console.log("I am Listening at port number 4000");
})