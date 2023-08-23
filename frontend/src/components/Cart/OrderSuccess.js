import React from "react";
import {BsCheckCircleFill} from "react-icons/bs";
import "./OrderSuccess.css";
import Typography from "react-material-ui-carousel"
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <BsCheckCircleFill />
      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;