
const express=require("express");
const {checkUserExist}=require("../middleWare/checkUser/checkUserExist");
const {getAccessToRoute,getAdminAccess}=require("../middleWare/authorization/auth");
const {blockUser,deleteUser,adminOrUser}=require("../controllers/admin");



const router=express.Router();

router.get("/adminoruser/:id",[getAccessToRoute,getAdminAccess,checkUserExist],adminOrUser);
router.get("/block/:id",[getAccessToRoute,getAdminAccess,checkUserExist],blockUser);
router.delete("/delete/:id",[getAccessToRoute,getAdminAccess,checkUserExist],deleteUser);


module.exports=router;
