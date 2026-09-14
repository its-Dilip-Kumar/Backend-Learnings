const mongoose=require("mongoose");
const {Schema} =mongoose;

async function main(){
    await mongoose.connect("mongodb+srv://dilipsharma6148_db_user:LWeSqEYq86aELzQg@codingadda.ymtafbp.mongodb.net/Instagram")
}

module.exports=main;

