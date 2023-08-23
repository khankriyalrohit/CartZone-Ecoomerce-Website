import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import {AiFillYoutube} from "react-icons/ai";
import {AiFillInstagram} from "react-icons/ai";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/khankriyal__rohit?igshid=MzNlNGNkZWQ4Mg==";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src= "https://cdn.wallpapersafari.com/34/82/aQSHT5.jpg"
              alt="Founder"
            />
            <Typography>Rohit Khankriyal</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by Rohit khankriyal. Only with the
              purpose to teach MERN Stack  and its applications to build websites. #Project1
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://youtube.com/@0toinfinity967"
              target="blank"
            >
              <AiFillYoutube className="youtubeSvgIcon" />
            </a>

            <a href="https://instagram.com/khankriyal__rohit?igshid=MzNlNGNkZWQ4Mg==" target="blank">
              <AiFillInstagram className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;