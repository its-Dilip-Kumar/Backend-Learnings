const redisClient = require("../config/redis");



////////////////////----------Fixed Window Algorithm----------------/////////////////
// const rateLimiter=async (req,res,next)=>{
//     const ip=req.ip;
//     const number_of_request=await redisClient.incr(ip);
//     if(number_of_request>60){
//         throw new Error("Limit Exceeded");
//     }

//     if(number_of_request===1){
//         await redisClient.expire(3600)
//     }
    
//     next();
// }

/////////////////===================Sliding Window Algorithm-------------//////////////////
const windowSize=3600;
const MaxRequest=60;
const rateLimiter=async (req,res,next)=>{
    try{
    const key=req.ip; //this will give you ip address of the user
    const currentTime=Date.now()/1000; // this will give you the current time
    const window_Time=currentTime-windowSize; //this will give you the time where you have to remove the previous time 

    await redisClient.zRemRangeByScore(key,0,window_Time);
    const numberOfRequest=await redisClient.zCard(key);


    if(numberOfRequest>=MaxRequest){
        throw new Error("Limit Exceeded");
    }


    //request is added
    await redisClient.zAdd(key,[{score:currentTime,value:`${currentTime}:${Math.random()}`}])

    //the key is TTL , so increase it
    await redisClient.expire(key,windowSize);

    }catch(e){
        res.send("Error: "+e.message);
    }
}

module.exports=rateLimiter;