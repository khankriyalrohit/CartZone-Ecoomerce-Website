import React from "react";
import "./Sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import {BiExpand} from "react-icons/bi";
import {MdOutlinePostAdd} from "react-icons/md";
import {BsDatabaseFillAdd} from "react-icons/bs";
import {MdImportExport} from "react-icons/md";
import {FaListAlt} from "react-icons/fa";
import {RxDashboard} from "react-icons/rx";
import {BsPeopleFill} from "react-icons/bs";
import {MdRateReview} from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Ecommerce" />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <RxDashboard /> Dashboard
        </p>
      </Link>
      <Link>
        <TreeView
          defaultCollapseIcon={<BiExpand />}
          defaultExpandIcon={<MdImportExport />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<MdOutlinePostAdd />} />
            </Link>

            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<BsDatabaseFillAdd />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/orders">
        <p>
          <FaListAlt />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <BsPeopleFill /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <MdRateReview />
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;