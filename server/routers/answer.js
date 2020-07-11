
const express=require("express");
const {getAccessToRoute}=require("../middleWare/authorization/auth");
const {addNewAnswerToQuestion,getAllAnswersByQuestions,
    getSingleByQuestion,updateAnswer,deleteAnswer}=require("../controllers/answer");
const {checkAnswerExist}=require("../middleWare/checkUser/checkUserExist");
const {getAnswerOwnerAccess}=require("../middleWare/authorization/auth");



const router=express.Router({mergeParams:true});


router.post("/",getAccessToRoute,addNewAnswerToQuestion);
router.get("/take",getAllAnswersByQuestions);
router.get("/:answer_id",checkAnswerExist,getSingleByQuestion);
router.put("/:answer_id/edit",[checkAnswerExist,getAccessToRoute,getAnswerOwnerAccess],updateAnswer);
router.delete("/:answer_id/delete",
    [checkAnswerExist,getAccessToRoute,getAnswerOwnerAccess],deleteAnswer);

module.exports=router;
