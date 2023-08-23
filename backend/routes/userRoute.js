const express = require("express");
const {registeruser, loginuser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUserDetails, updateRole, deleteUser} = require("../controllers/usercontroller" );
const { isAuthenticatedUser,authorisedRoles } = require("../middleware/authentification");

const router = express.Router();

router.route("/register").post(registeruser);
router.route("/login").post(loginuser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser,getUserDetails);
router.route("/logout").get(logout);
router.route("/password/update").put(isAuthenticatedUser,updatePassword);
router.route("/me/update").put(isAuthenticatedUser,updateProfile);
router.route("/admin/users").get(isAuthenticatedUser,authorisedRoles("admin"),getAllUser);
router.route("/admin/user/:id").get(isAuthenticatedUser,authorisedRoles("admin"),getSingleUserDetails).put(isAuthenticatedUser,authorisedRoles("admin"),updateRole).delete(isAuthenticatedUser,authorisedRoles("admin"),deleteUser);
module.exports = router;