
const express=require("express");
const {register,login,logout,imageUpload,forgotPassword,resetPassword}=require("../controllers/auth");
const {getAccessToRoute}=require("../middleWare/authorization/auth");
const profileImageUpload=require("../middleWare/libraries/profileImageUpdate");

const router=express.Router();


router.post("/register",register);
router.post("/login",login);
router.get("/logout",getAccessToRoute,logout);
router.post("/forgotPassword",forgotPassword);
router.post("/upload",[getAccessToRoute,profileImageUpload.single("profile_image")],imageUpload);
router.put("/resetpassword",resetPassword);

module.exports=router;
