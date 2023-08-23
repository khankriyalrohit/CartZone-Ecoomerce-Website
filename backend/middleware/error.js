const ErrorHandler = require("../utils/errorhandler");

module.exports = (err,req,res,next)=>{
    err.statuscode = err.statuscode || 500;
    err.message = err.message || "Internal error found"


    //Wrong MongoDB error  CAST ERROR
    if(err.name === "CastError"){
    const message = `Resource Not Found : Invalid :: ${err.path}` ;
    err = new ErrorHandler(message,400)
    }
    //Mongoose duplicate key error 
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        err = new ErrorHandler(message,400)
    }
    //Wrong JSONwebtoken 
    if(err.name === "JsonWebTokenError" ){
        const message = `Json web token is Invalid,Try Again` ;
        err = new ErrorHandler(message,400)
        }
        // JSONwebtoken Expire 
    if(err.name === "TokenExpiredError" ){
        const message = `Json web token is Expired,Try Again` ;
        err = new ErrorHandler(message,400)
        }

    res.status(err.statuscode).json({
        success: false ,
        message:err.message,
        error:err.stack    // For error with reasons 
        //error: err     //  FOR ONLY ERROR PRINT 
    })
}
