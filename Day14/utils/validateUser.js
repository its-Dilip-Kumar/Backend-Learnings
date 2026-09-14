const validator=require("validator");

//from here 
 
function validateUser(data){

        const mandatoryField=["firstName","emailId","age","password"];
        const isAllowed=mandatoryField.every((keys)=>Object.keys(data).includes(keys));
        if(!isAllowed){
            throw new Error("Fields Missing");
        }

        if(!validator.isEmail(data.emailId)){
            throw new Error("Invalid Email");
        }

        if(!validator.isStrongPassword(data.password)){
            throw new Error("Weak password");
        }

        if((data.firstName.length>=3 && data.firstName.length<=20)){
            throw new Error("First Name should have atleast 3 character" );
        }



    }

        //to here -> this is API level validation 

module.exports=validateUser;