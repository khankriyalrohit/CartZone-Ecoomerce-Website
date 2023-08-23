const Product = require("../models/productmodel");
const ErrorHandler = require("../utils/errorhandler");
const catchasyncError = require("../middleware/catchasyncerror");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// CREATE PRODUCT 

exports.createProduct =catchasyncError( async(req,res,next)=>{

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
})


exports.getAllProducts = catchasyncError( async (req,res,next)=>{
    const resultPerPage = 8;
    const productCount = await Product.countDocuments();
    const apifeatures = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    // const product = await Product.find();   no need now

     const product = await apifeatures.query;
    //  const product = await  Product.find();

     const filteredProductsCount = product.length;
  

    res.status(200).json({ 
        success : true,
        product,
        productCount,
        resultPerPage,
        filteredProductsCount,
    })
})
//Get all Products (ADMIN)
// Get All Product (Admin)
exports.getAdminProducts = catchasyncError(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

exports.updateProduct = catchasyncError(async (req,res,next)=>{

    let product = await Product.findById(req.params.id);

    if(!product){

        return res.status(500).json({ 
            success : false,
            message : "Product was not found"}
        )
    }

     product = await Product.findByIdAndUpdate(req.params.id , req.body ,{
        new : true,
        runValidators : true,
        useFindAndModify : false
    })

    res.status(200).json({ 
        success : true,
        product}
    )
})

exports.deleteProduct = catchasyncError(async (req,res,next)=>{

    const product = await Product.findById(req.params.id);

    if(!product){

        return res.status(500).json({ 
            success : false,
            message : "Product was not found"}
        )
    }

    // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

     await product.deleteOne();

     res.status(200).json({ 
        success : true,
        message : " The product was removed from the app"}
    )
})

exports.productDetails = catchasyncError(async (req,res,next)=>{

    const product = await Product.findById(req.params.id);

    if(!product){

        return next(new ErrorHandler("Product Not Found",404));
    }

     res.status(200).json({ 
        success : true,
        product,
    }
    )
})
// Create and update review 
exports.createProductReview = catchasyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
  
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
      (rev) => rev.user === req.user._id
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user === req.user._id)
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numofreviews = product.reviews.length;
    }
  
    let avg = 0;
  
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    product.rating = avg / product.reviews.length;
  
    await product.save({ validateBeforeSave: false });
  
    res.status(200).json({
      success: true,
    });
  });

// Get all Reviews 
exports.getAllReviews = catchasyncError(async (req,res,next)=>{
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("Product is not found in the record..."));
    }
    res.status(200).json({
        success : true,
        review : product.reviews,
    })
})

//Delete reviews
exports.deleteReview = catchasyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
  
    let avg = 0;
  
    reviews.forEach((rev) => {
      avg += rev.rating;
    });
  
    let ratings = 0;
  
    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }
  
    const numofreviews = reviews.length;
  
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numofreviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
  
    res.status(200).json({
      success: true,
    });
  });

// we used catchasyncerror function here to reduce the try and catch function code adn remove async error 