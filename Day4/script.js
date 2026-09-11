//This is how we can create a server using node.js

// const http=require('http');
// const server=http.createServer((req,res)=>{
//     res.end("Hello I am Dilip Sharma");
// })

// server.listen(4000,()=>{
//     console.log("I am Listening at port number 4000");
// })


//This is how we can follow routing 

const http=require('http');
const server=http.createServer((req,res)=>{
    if(req.url==='/'){
        res.end("I am Dilip Sharma");
    }else if(req.url==='/about'){
        res.end("This is our About Page");
    }else if(req.url==='/contact'){
        res.end("This is our Contact Page");
    }else{
        res.end("Error: Page Not Found");
    }
});

server.listen(4000,()=>{
    console.log("I am Listening at port number 4000");
})