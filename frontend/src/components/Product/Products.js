import React, { Fragment, useEffect, useState } from "react"; 
import './Products.css'
import {getProduct,clearErrors} from "../../action/productAction"
import { useSelector , useDispatch} from "react-redux"
import ProductCard from '../Home/ProductCard'
import Loader from "../Layout/Loader/Loader.js"
import {useAlert} from "react-alert"
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination"
import Slider from '@mui/material/Slider';
import Typography from "react-material-ui-carousel"
import MetaData from '../MetaData'

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    
    const {keyword} = useParams()

    const [currentPage,setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory] = useState("");
    const [rating, setRatings] = useState(0);

    const {loading,error,product,productCount,resultPerPage, filteredProductsCount} = useSelector(state=>state.product)
    
    const setCurrentPageNo=(e)=>{
      setCurrentPage(e)
    }
    const priceHandler = (event, newPrice) => {
      setPrice(newPrice);
    };
    const ratingHandler = (event,newRating) => {
      setRatings(newRating)
    }

    useEffect(()=>{
        if(error){
        alert.error(error);
        dispatch(clearErrors())
        }
          dispatch(getProduct(keyword,currentPage,price,category));
      },[dispatch,error,alert,keyword,currentPage,price,category])
const count =  filteredProductsCount;

  return (
   <Fragment>
    {loading ? <Loader/> :
    <Fragment>
      <MetaData  title = "CartZone ---- Products"/>
        <h2 className="productsHeading">Products</h2>

      <div className="products">
         {product &&
          product.map((product) => (
          <ProductCard key={product._id} product={product} />
    ))}
      </div>
      
      {keyword && <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

<Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={rating}
                onChange={ratingHandler}
                aria-labelledby="range-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>

            </div>}

     <div className="paginationBox">
      {resultPerPage < productCount && (<Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount= {productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            )}
              </div>
    </Fragment> }
   </Fragment>
  )
}

export default Products
