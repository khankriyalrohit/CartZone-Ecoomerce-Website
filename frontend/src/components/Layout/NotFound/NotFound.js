import React from "react";
import {BiSolidErrorAlt} from "react-icons/bi";
import "./NotFound.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="PageNotFound">
      <BiSolidErrorAlt/>

      <Typography> Sorry ! Page Not Found </Typography>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;