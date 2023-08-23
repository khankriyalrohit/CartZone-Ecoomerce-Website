const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
    name:{
        type : String,
        required : [true,"Enter the name of the product :  "]
    },
    description:{
        type : String,
        required : [true,"Enter the description of the product :  "]
    },
    price:{
        type : Number,
        required : [true,"Enter the price of the product :  "],
        maxlength : [8,"Product price cannot be greater than 8 characters"]
    },
    rating : {
        type : Number,
        default : 0
    },
    images :[{
        public_id:{
         type : String,
         required: true
        },
        url:{
            type : String,
            required: true
           }
    }],
    category:{
        type : String,
        required : [true,"Enter the category of the product :  "]
    },
    Stock:{
        type : Number,
        required : [true,"Enter the Stocks of the product :  "],
        default : 1,
        maxlength:[4,"Product can have only four characters of stock"]
    },
    numofreviews:{
        type : Number,
        default : 0
    },
    reviews:[{
        user:{
            type : mongoose.Schema.ObjectId,
            ref:"User",
         
     },
        name:{
            type: String,
            
        },
        rating:{
            type: Number,
            
        },
        comment:{
            type: String
        }
    }],
    user:{
           type : mongoose.Schema.ObjectId,
           ref:"User",
        //    required:true
    },
    createdAt:{
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("Product",productschema);