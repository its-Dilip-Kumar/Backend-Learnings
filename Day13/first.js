//by the help of bcrypt we can encrypt 
// the password and store it in database 
// so that no one can get it.




const password="Rohit@123";

const bcrypt=require("bcrypt");


async function Hashing(){

    // const salt=await bcrypt.genSalt(10);
    // const hashpass=await bcrypt.hash(password,salt);
    // console.time("hash");  //starting time
    const hashpass=await bcrypt.hash(password,10);
    // console.timeEnd("hash");  // ending time
    const ans=await bcrypt.compare("Rohit@123",hashpass);

    console.log(ans);

}

Hashing();