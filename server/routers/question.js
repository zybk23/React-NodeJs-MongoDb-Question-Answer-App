const express=require("express");
const {getAccessToRoute,getQuestionOwnerAccess}=require("../middleWare/authorization/auth");
const {checkQuestionExist}=require("../middleWare/checkUser/checkUserExist");
const {askNewQuestion,getAllQuestions,
    getSingleQuestion,editQuestion,
    deleteQuestion,likeQuestion}=require("../controllers/question");
const answer=require("./answer");



const router =express.Router();


router.post("/ask",getAccessToRoute,askNewQuestion);
router.get("/",getAllQuestions);
router.get("/:id",getAccessToRoute,getSingleQuestion);
router.put("/:id/edit",[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],editQuestion);
router.delete("/:id/delete",[getAccessToRoute,checkQuestionExist,getQuestionOwnerAccess],deleteQuestion);
router.get("/:id/like",[getAccessToRoute,checkQuestionExist],likeQuestion);

router.use("/:question_id/answers",checkQuestionExist,answer);


module.exports=router;
