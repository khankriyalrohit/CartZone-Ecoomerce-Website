import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import ("./Footer.css")
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>CartZone</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; MyselfRohitKhankriyal</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://instagram.com/khankriyal__rohit?igshid=MzNlNGNkZWQ4Mg==">Instagram</a>
        <a href="https://youtube.com/@0toinfinity967">Youtube</a>
        <a href="http://instagram.com/meabhisingh">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;