import React, { Fragment, useState } from "react";
import './Header.css'
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {useNavigate} from 'react-router-dom';
import { BiSolidDashboard} from 'react-icons/bi'
import {GiMonkFace} from "react-icons/gi"
import {BiSolidCartAlt} from 'react-icons/bi'
import { MdOutlineTransitEnterexit} from 'react-icons/md'
import { FaListAlt} from 'react-icons/fa'
import { logout } from "../../../action/userAction";
import { Backdrop } from '@mui/material';

const UserOptions = ({user}) => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { cartItems } = useSelector((state) => state.cart);
    const [open, setOpen] = useState(false);

    const options = [
        { icon: <FaListAlt />, name: "Orders", func: orders },
        { icon: <GiMonkFace />, name: "Profile", func: account },
        {
          icon: (
            <BiSolidCartAlt
              style={{ color: cartItems.length > 0 ? "tomato" : "unset" }} 
            />
          ),
          name: `Cart(${cartItems.length})`,
          func: cart,
        },
        { icon: <MdOutlineTransitEnterexit />, name: "Logout", func: logoutUser },
      ];
    
      if (user.role === "admin") {
        options.unshift({
          icon: < BiSolidDashboard/>,
          name: "Dashboard",
          func: dashboard,
        });
      }
    
      function dashboard() {
        navigate("/admin/dashboard");
      }
    
      function orders() {
        navigate("/orders");
      }
      function account() {
        navigate("/account");
      }
      function cart() {
        navigate("/cart");
      }

      function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully");
      }
    

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }} />
<SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  )
}

export default UserOptions
