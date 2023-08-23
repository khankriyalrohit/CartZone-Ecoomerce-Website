const express = require("express");
const { getAllProducts , createProduct, updateProduct, deleteProduct, productDetails, createProductReview, deleteReview, getAllReviews, getAdminProducts } = require("../controllers/productController");
const { isAuthenticatedUser,authorisedRoles } = require("../middleware/authentification");

const router = express.Router();

router.route("/admin/products").get(isAuthenticatedUser,authorisedRoles("admin"),getAdminProducts)

router.route("/admin/product/new").post(isAuthenticatedUser,authorisedRoles("admin"),createProduct);
router.route("/products").get(getAllProducts);
router.route("/admin/products/:id").put(isAuthenticatedUser,authorisedRoles("admin"),updateProduct).delete(isAuthenticatedUser,authorisedRoles("admin"),deleteProduct);
router.route("/products/:id").get(productDetails);
router.route("/review").put(isAuthenticatedUser,createProductReview )
router.route("/reviews").get(getAllReviews).delete(deleteReview)

 
module.exports = router;
