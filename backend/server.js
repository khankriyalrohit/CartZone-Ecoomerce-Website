const app = require("./app")
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");

const connectDatabase = require("./config/database")

// Unhandled Unchaught Exception 
process.on("uncaughtException",err=>{
    console.log(`Error : : ${err.message}`);
    console.log("Shutting down the server dur to Unhandled Unchaught Exception");
    process.exit(1);
})

// console.log(youtube);   Uncaught Exception error

// config 
dotenv.config({path:"backend/config/config.env"});

//Cloudinary 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

// CONNECTING TO A DATABASE 
connectDatabase()

const server = app.listen(process.env.PORT,()=>{
    console.log(`The server is running on http://localhost:${process.env.PORT}`);
})

// Unhandled Promise Reajection
process.on("unhandledRejection",err=>{
    console.log(`Error : : ${err.message}`);
    console.log("Shutting down the server dur to Unhandled Promise Rejection");

    server.close(()=>{
        process.exit(1);
    });
})