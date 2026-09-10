console.log("I am second")

function sum(a,b){
    console.log(a+b);
}

function sub(a,b){
    console.log(a-b);
}


// module.exports=sum;  //iski help se hum export krva skte hai or dusri file me function ko call kr skte hai 

module.exports={sum,sub};