import React from 'react'
import {ReactNavbar} from 'overlay-navbar'
import logo from "../../../images/logo.png";
import {FaUserAlt} from "react-icons/fa"
import {FaSistrix} from "react-icons/fa"
import {AiOutlineShoppingCart} from "react-icons/ai"
const options = {
  burgerColorHover: "#eb4034",
  logo,
  logoWidth: "20vmax",
  navColor1: "rgb(0,255,255,0.5)",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products", 
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "aqua",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "black",
  searchIconColor: "black",
  cartIconColor: "black",
  profileIconColorHover: "aqua",
  searchIconColorHover: "aqua", 
  cartIconColorHover: "aqua",
  cartIconMargin: "1vmax",
};

export default function Header() {
  return (
      <ReactNavbar
       profileIcon = {true}
       searchIcon ={true} 
       cartIcon = {true} 
       ProfileIconElement={FaUserAlt}
        CartIconElement = {AiOutlineShoppingCart}
       SearchIconElement  = {FaSistrix} 
       {...options}  />
  )
}
