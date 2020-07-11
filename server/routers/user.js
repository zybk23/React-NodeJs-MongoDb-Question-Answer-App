const express=require("express");
const  {getAllUsers,getSingleUser}=require("../controllers/user");
const {checkUserExist}=require("../middleWare/checkUser/checkUserExist");



const router=express.Router();

router.get("/",getAllUsers);
router.get("/:id",checkUserExist,getSingleUser);

module.exports=router;
