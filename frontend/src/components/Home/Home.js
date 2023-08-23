import './Home.css';
import React, { Fragment, useEffect } from "react"; 
import {CgMouse} from "react-icons/cg"
import './Home.css'
import ProductCard from './ProductCard'
import MetaData from '../MetaData';
import {getProduct,clearErrors} from "../../action/productAction"
import { useSelector , useDispatch} from "react-redux"
import Loader from "../Layout/Loader/Loader.js"
import {useAlert} from "react-alert"

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const {loading,error,product,productCount} = useSelector(state=>state.product)

  useEffect(()=>{
    if(error){
    alert.error(error);
    dispatch(clearErrors())
    }
      dispatch(getProduct());
  },[dispatch,error,alert])
  
  return (
  <Fragment>
    {loading ? <Loader/> :<Fragment>
  <MetaData title ="CartZone"/>
    <div className="banner">
      <p>Welcome To CartZone</p>
      <h1>Find Amazing products Below</h1>

      <a href="#container">
        <button>
          Scroll <CgMouse/>
        </button>
      </a>
    </div>
    <h2 className="homeheading">
      Featured Products
    </h2>
    <div className="container" id="container">
    {product &&
            product.map((product) => (
              <ProductCard  product={product} />
            ))}
    </div>
  </Fragment>}
  </Fragment>
  ) 
}

export default Home
