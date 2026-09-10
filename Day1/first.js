// require("./second")    ///import krva skte hai iska use krke 

// (function (){
//     console.log("I am second")
// })();                                 jb hum import krvate hai to aise aata hai , mtlb humne require(./second) likha to usne 
// iife function me laake de deta hai 

// (function (){
//     console.log("I am second");
// function sum(a,b){
//     console.log(a+b);
// }
// })();


// sum(3,4);



// (function (){          ///is tarah se jab hum require use krte hai to woh second.js file se lekar aata hai or run ho jaati hai file
//     console.log("I am second")

// function sum(a,b){
//     console.log(a+b);
// }

// sum(3,4);
// })();





// const sum = require("./second")

const {sum,sub}=require("./second") //jb ek se jada function export ho rahe ho 

sum(3,4);
sub(3,4)



console.log("Hello I am First");

