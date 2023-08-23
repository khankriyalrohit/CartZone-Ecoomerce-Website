const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


const Userschema = new mongoose.Schema({
    name:{
        type:String,
        required : [true,"Enter the Full Name :: "],
        minlength : [4,"Name should be greater than 4 characters"],
        maxlength : [30,"Name should be Less than 4 characters"],
    },
    email:{
        type:String,
        required : [true,"Enter the Email id :: "],
        minlength : [8,"Email should be greater than 8 characters"],
        validate : [validator.isEmail,"Enter a valid email"],
        unique : true
    },
    password : {
        type: String,
        required : [true,"Enter the Password :: "],
        minlength : [8,"Password should be greater than 8 characters"],
        maxlength : [20,"Password should be less than 20 characters"],
        select : false
    },
    avatar : {
        public_id:{
            type : String,
            required: true
           },
           url:{
               type : String,
               required: true
              }
    },
    role : {
        type : String,
        default : "user"
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },

    resetPasswordToken : String,
    resetPasswordExpire : Date,
})

Userschema.pre("save",async function(next){

   if(!this.isModified("password")){
    next();
   }

    this.password = await bcryptjs.hash(this.password,10);

})

//JWT TOKEN 
Userschema.methods.getJWTToken = function(){
    return jwt.sign({"id":this._id},process.env.JWT_SECRET,{
        expiresIn : process.env.JWT_EXPIRES ,
});
}

// COMPARE PASSWORD 
Userschema.methods.comparePassword = async function(enteredpassword){
   return await bcryptjs.compare(enteredpassword,this.password);
}
//Generating Password through Reset Token
Userschema.methods.getResetPasswordToken = function(){
  
    //Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // HASHING AND ADDING RESET PASSWORD TOKEN SCHEME
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now()+ 15*60*1000;

    return resetPasswordToken;
}



module.exports = mongoose.model("User",Userschema);