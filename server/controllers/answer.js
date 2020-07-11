
const asyncErrorWrapper=require("express-async-handler");
const User=require("../models/User");
const CustomError=require("../helpers/error/CustomError");
const Question=require("../models/Question");
const Answer=require("../models/Answer");


const addNewAnswerToQuestion=asyncErrorWrapper(async (req,res,next)=>{
    const {question_id}=req.params;

    const user_id=req.user.id;

    const {content}=req.body;

    const answer=await Answer.create({
        content:content,
        question:question_id,
        user:user_id
    });
    return res.status(200).json({
        success:true,
        message:"Answer created successful",
        data:answer
    })

});
const getAllAnswersByQuestions=asyncErrorWrapper(async (req,res,next)=>{
    const {question_id}=req.params;

    const question=await Question.findById(question_id).populate("answers");
   // console.log(question);
    const answers=question.answers;

    return res.status(200)
        .json({
            success:true,
            count:answers.length,
            data:answers
        })
});
const getSingleByQuestion=asyncErrorWrapper(async (req,res,next)=>{
    const {answer_id}=req.params;
    const answer=await Answer.findById(answer_id)
        .populate(
            {
                path:"question",
                select:"content"
            }
        )
        .populate(
            {
                path:"user",
                select:"email"
            }
        );

    return res.status(200).json({
        success:true,
        data:answer
    })

});
const updateAnswer=asyncErrorWrapper(async (req,res,next)=>{
    const {answer_id}=req.params;

    const {content}=req.body;
    let answer=await Answer.findById(answer_id);
    answer.content=content;

    await answer.save();

    return res.status(200).json({
        success:true,
        data:answer
    })
});
const deleteAnswer=asyncErrorWrapper(async(req,res,next)=>{

    const {answer_id}=req.params;

    const {question_id}=req.params;

    await Answer.findByIdAndRemove(answer_id);

    const question =await Question.findById(question_id);

    question.answers.splice(question.answers.indexOf(answer_id),1);

    await question.save();

    return res.status(200)
        .json({
            success:true,
            message:"Answer delted succesfuly"
        })

});



module.exports={addNewAnswerToQuestion,updateAnswer,
    getAllAnswersByQuestions,getSingleByQuestion,deleteAnswer};
