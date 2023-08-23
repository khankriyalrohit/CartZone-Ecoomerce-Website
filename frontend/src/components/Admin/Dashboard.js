import React, { useEffect } from "react";
import Sidebar from './Sidebar'
import './Dashboard.css'
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Typography } from '@material-ui/core';
import { Doughnut, Line } from "react-chartjs-2";
import {getAdminProduct} from "../../action/productAction";
import {getAllOrders} from "../../action/orderAction"

const Dashboard = () => {
  const dispatch = useDispatch();

  const { product } = useSelector((state) => state.product);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;
  let totalAmount = 0;

  product &&
    product.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

    orders && orders.forEach((item)=>{
      totalAmount += item.totalPrice ;
    })

    useEffect(() => {
      dispatch(getAdminProduct());
      dispatch(getAllOrders());
    }, [dispatch]);


    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["aqua"],
            hoverBackgroundColor: ["blue"],
            data: [0, {totalAmount}],
          },
        ],
      };

      const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
          {
            backgroundColor: ["tomato", "aqua"],
            hoverBackgroundColor: ["rgba(245, 107, 137, 0.785)", "rgba(131, 248, 233, 0.768)"],
            data: [outOfStock, product.length],   
          },
        ],
      };

  return (
    <div className = "dashboard">
      <Sidebar/>
      <div className="dashboardContainer">
      <Typography component="h1">Dashboard</Typography>

<div className="dashboardSummary">
  <div>
    <p>
      Total Amount <br /> ₹{totalAmount}
    </p>
  </div>
  <div className="dashboardSummaryBox2">
    <Link to="/admin/products">
      <p>Product</p>
      <p>{product && product.length}</p>
    </Link>
    <Link to="/admin/orders">
      <p>Orders</p>
      <p>{orders && orders.length}</p>
    </Link>
    <Link to="/admin/users">
      <p>Users</p>
      <p>{users && users.length}</p>
    </Link>
  </div>
</div>

<div className="lineChart">
          <Line data={lineState} />
        </div>

         <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>

      </div>
    </div>
  )
}

export default Dashboard
