const mongoose=require("mongoose");
const { Schema } = mongoose;


async function main(){
    await mongoose.connect("mongodb+srv://dilipsharma6148_db_user:LWeSqEYq86aELzQg@codingadda.ymtafbp.mongodb.net/test")


    const userSchema=new Schema({
        name:String,
        age:Number,
        city:String,
        gender:String,
    })


    // const user1=new User({name:"rahul",age:22,city:"Etah"}); //method 1 for document creation
    // await User.create({name:"Pappu",age:25,gender:"male"}); //method 2 for document creation

    // await User.insertMany([{name:"Mayank",age:24,gender:"male"},{name:"pankaj",age:30,gender:"male"}]); //method 3 for multiple document creation 
    // await user1.save(); //used for saving documents //used for only when we use method 1 for document creation

    // const ans=await User.find({name:"Mayank"}); //for finding the particular document
    // console.log(ans);

    // const ans=await User.find({}); //jab saare document find ko dekhna ho to 
    // console.log(ans);

    // await User.deleteOne({name:"pankaj"});  //jab kisi particular ko delete krna ho 

    // const res=await User.updateOne({name:"Pappu"},{age:40}); // used when we have to update the document field

}

module.exports=main;