const asyncErrorWrapper=require("express-async-handler");
const User=require("../models/User");
const CustomError=require("../helpers/error/CustomError");
const Question=require("../models/Question");

const askNewQuestion=asyncErrorWrapper(async (req,res,next)=>{
        const information=req.body;

        const question=await Question.create({
            ...information,
            user:req.user.id
        });
        return res.status(200).json({
            success:true,
            data:question
        });
});
const getAllQuestions=asyncErrorWrapper(async (req,res,next)=>{
        const questions=await Question.find().populate(
            {
                path:"user",
                select:["name","email"]
            }
        );

        //console.log(userId)

        return res.status(200).json({
            success:true,
            data:questions
        })
});
const getSingleQuestion=asyncErrorWrapper(async (req,res,next)=>{
    const {id}=req.params;

    const question=await Question.findById(id);

    res.status(200).json({
        success:true,
        message:"success",
        data:question
    });
});
const editQuestion=asyncErrorWrapper(async (req,res,next)=>{

    const {id}=req.params;

    const {title,content}=req.body;

    let question=await Question.findById(id);

    question.title=title;
    question.content=content;

    question=await question.save();
    return res.status(200)
        .json({
            success:true,
            data:question
        })
});
const deleteQuestion=asyncErrorWrapper(async (req,res,next)=>{

    const {id}=req.params;

    await Question.findByIdAndDelete(id);

    return res.status(200).json({
        success:true,
        message:"Delete question operation Successful"
    })

});
const likeQuestion=asyncErrorWrapper(async (req,res,next)=>{

    const {id}=req.params;
    const question=await Question.findById(id);

   /* if(question.likes.includes(req.user.id)){
        return next(new CustomError("You already liked this question"));
    }*/

    question.likes.push(req.user.id);


    await question.save();
    return res.status(200).json({
        success:true,
        message:"Likes Successful",
        data:question
    })

});


module.exports={askNewQuestion,
    getAllQuestions,getSingleQuestion,
    editQuestion,deleteQuestion,likeQuestion};
