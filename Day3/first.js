const fs=require("fs");

let a=10;
let b=11;

console.log(b);

function sum(a,b){
    return a+b;
}

fs.readFile("./data.json","utf8",(err,res)=>{
    console.log(res);
})


setTimeout(()=>{
    console.log("Time Out!")
},3000);

console.log(a);
console.log(sum(3,4));
