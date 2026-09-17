const redis=require("redis");
require('dotenv').config()

const redisClient=redis.createClient({
     url: process.env.REDIS_URL
})

// const connectRedis=async ()=>{
//     await redisClient.connect();
//     console.log("Connected to Redis");
// }

// connectRedis();
module.exports=redisClient;