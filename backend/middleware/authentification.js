const ErrorHandler = require("../utils/errorhandler");
const catchasyncerror = require("./catchasyncerror");
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

exports.isAuthenticatedUser = catchasyncerror( async (req,res,next)=>{
   
    const {token} = req.cookies ;
    if(!token){
        return next(new ErrorHandler("Please Login to acces this resource",401))
    }
   const decodedData = jwt.verify(token,process.env.JWT_SECRET);

   req.user = await User.findById(decodedData.id);

   next();
    
});

exports.authorisedRoles= (...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
           return next( new ErrorHandler(`Roles ${req.user.role} is not allowed to acces this resource`,403));
        }
        next();
    };
};