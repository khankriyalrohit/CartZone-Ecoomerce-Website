import './App.css';
import { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';
import { useSelector } from "react-redux";
import Header from './components/Layout/Header/Header';
import WebFont from "webfontloader";
import React from "react";
import Footer from './components/Layout/Footer/Footer';
import Home from './components/Home/Home.js';
import ProductDetails from './components/Product/ProductDetails';
import ReactDOM from 'react-dom';
import Products from './components/Product/Products';
import Search from './components/Product/Search'
import LoginSignUp from './components/User/LoginSignUp';
import store from './store'
import {loadUser} from './action/userAction'
import UserOptions from './components/Layout/Header/UserOptions';
import Profile from './components/User/Profile';
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
// import axios from 'axios';
// import Payment from './components/Cart/Payment';
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrder from './components/Order/MyOrder';
// import {Elements} from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/stripe-js';
import PaymentStripe from './components/Cart/PaymentStripe';
import OrderDetails from './components/Order/OrderDetails';
import Dashboard from './components/Admin/Dashboard';
import ProductList from './components/Admin/ProductList';
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import OrderList from './components/Admin/OrderList';
import ProcessOrder from './components/Admin/ProcessOrder';
import UsersList from './components/Admin/UsersList';
import UpdateUser from './components/Admin/UpdateUser';
import ProductReviews from './components/Admin/ProductReviews';
import About from './components/Layout/About/About';
import Contact from './components/Layout/Contact/Contact';
import NotFound from './components/Layout/NotFound/NotFound';

function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  // const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get("/api/v1/stripeapikey");

  //   setStripeApiKey(data.stripeApiKey);
  // }


  React.useEffect(()=>{
    WebFont.load({
      google:{
        families : ["Roboto" , "Droid Sans" , "Chilanka"],
      },
    });

    store.dispatch(loadUser())
    // getStripeApiKey();
  },[]);
  
  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
  <Router>
      {isAuthenticated && <UserOptions user={user} />}
      <Header/>
      <Routes>
      <Route exact path = "/" element = {<Home/>}/>
      <Route exact path = "/product/:id" element = {<ProductDetails/>}/>
      <Route exact path = "/products" element = {<Products/>}/>
      <Route  path = "/products/:keyword" element = {<Products/>}/>
      <Route exact path = "/Search" element = {<Search/>}/>
      <Route exact path = "/login" element = {<LoginSignUp/> }/>
      <Route exact path = "/password/forgot" element = {<ForgotPassword/>}/>
      <Route exact path = "/password/reset/:token" element = {<ResetPassword/>}/>
      <Route exact path = "/about" element = {<About/>}/>
      <Route exact path = "/contact" element = {<Contact/> }/>



      {isAuthenticated && <Route exact path = "/account" element = {<Profile/> }/>}
      {isAuthenticated && <Route exact path = "/me/update" element = {<UpdateProfile/> }/>}
      {isAuthenticated && <Route exact path = "/password/update" element = {<UpdatePassword/> }/>}
      {isAuthenticated && <Route exact path = "/Cart" element = {<Cart/> }/>}
      {isAuthenticated && <Route exact path = "/shipping" element = {<Shipping/> }/>}
      {isAuthenticated && <Route exact path = "/order/confirm" element = {<ConfirmOrder/> }/>}
      {isAuthenticated && <Route exact path = "/success" element = {<OrderSuccess/> }/>}
      {isAuthenticated && <Route exact path = "/orders" element = {<MyOrder/> }/>}
      {isAuthenticated && <Route exact path = "/process/payment" element = {<PaymentStripe/>}/>}
      {isAuthenticated && <Route exact path = "/order/:id" element = {<OrderDetails/>}/>}


      {isAuthenticated && user.role==="admin" && <Route exact path = "/admin/dashboard" element = {<Dashboard/>}/>}
      {isAuthenticated && user.role==="admin" && <Route exact path = "/admin/products" element = {<ProductList/>}/>}
      {isAuthenticated && user.role==="admin" && <Route exact path = "/admin/product" element = {<NewProduct/>}/>}
      {isAuthenticated && user.role==="admin" && <Route exact path = "/admin/product/:id" element = {<UpdateProduct/>}/>}
      {isAuthenticated && user.role==="admin" && <Route exact path = "/admin/orders" element = {<OrderList/>}/>}
      {isAuthenticated && user.role==="admin" && <Route exact path = "/admin/order/:id" element = {<ProcessOrder/>}/>}
      {isAuthenticated && user.role==="admin" && <Route exact path = "/admin/users" element = {<UsersList/> }/>}
      {isAuthenticated && user.role==="admin" && <Route exact path = "/admin/user/:id" element = {<UpdateUser/> }/>}
      {isAuthenticated && user.role==="admin" && <Route exact path = "/admin/reviews" element = {<ProductReviews/> }/>}


      <Route
        path = "*"
          element = {<NotFound/> }
        />

      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
