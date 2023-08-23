import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:khankriyalrohit434@gmail.com">
        <Button>Contact: ROHIT KHANKRIYAL here...</Button>
      </a>
    </div>
  );
};

export default Contact;