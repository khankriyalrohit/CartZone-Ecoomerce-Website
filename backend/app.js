const express = require("express");
const app = express();
const errorMiddleWare = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv");
const path = require("path")

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended : true}));
app.use(fileUpload());


// config 
dotenv.config({path:"backend/config/config.env"});


// Routes 
const product = require("./routes/productRoute.js");
const user = require("./routes/userRoute.js");
const order = require("./routes/orderRoute.js");
const payment = require("./routes/paymentRoute.js");

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);


// Middleware
app.use(errorMiddleWare);

module.exports = app;