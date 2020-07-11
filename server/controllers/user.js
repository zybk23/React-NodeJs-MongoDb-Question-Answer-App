const asyncErrorWrapper=require("express-async-handler");
const User=require("../models/User");
const CustomError=require("../helpers/error/CustomError");

const getAllUsers=asyncErrorWrapper(async (req,res,next)=>{
    const users =await User.find();

    return res.status(200)
        .json({
        success:true,
            message:"success",
            data:users
    })
});
const getSingleUser=asyncErrorWrapper(async (req,res,next)=>{
    const {id}=req.params;
    const user=await User.findById(id);

    res.status(200).json({
        success:true,
        message:"success",
        data:user
    })
});


module.exports={
    getAllUsers,
    getSingleUser
};
