const mongoose = require("mongoose");

const connectDatabase = ( )=>{

    mongoose.connect(process.env.DB_URI,{useNewUrlParser:true , useUnifiedTopology:true}).then((data)=>{
        console.log(`MongoDb connected succesfullly at ${data.connection.host}`);
    })
    // .catch((error)=>{
    //     console.log(error);          No use of catch function as we used unhandled promise rejection 
    // })
}

module.exports = connectDatabase 

