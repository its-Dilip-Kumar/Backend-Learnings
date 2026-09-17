const validator=require("validator")

function ValidateUser(data){
    // const mandatoryFields=["FirstName","gender","emailId","password"];
    // const isAllowed=mandatoryFields.every((keys)=>Object.keys(data).includes(keys));
    // if(!isAllowed){
    //     throw new Error("Details Missing");
    // }

    if(!validator.isEmail(data.emailId)){
        throw new Error("Invalid email");
    }

    if(!validator.isStrongPassword(data.password)){
        throw new Error("Password is not strong");
    }

    if(!(data.firstName.length>=3 && data.firstName.length<=20)){
        throw new Error("Invalid FirstName");
    }
}

module.exports=ValidateUser;