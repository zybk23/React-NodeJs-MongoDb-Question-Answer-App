const asyncErrorWrapper=require("express-async-handler");
const User=require("../models/User");
const CustomError=require("../helpers/error/CustomError");

const adminOrUser=asyncErrorWrapper(async (req,res,next)=>{
    return res.status(200)
        .json({
            success:true,
            message:"admin"
        })
});

const blockUser=asyncErrorWrapper(async (req,res,next)=>{
    const {id}=req.params;
    const user=await User.findById(id);

    user.blocked=!user.blocked;

    await user.save();

    return res.status(200)
        .json({
            success:true,
            message:"Block-UnBlock Success"
        })
});
const deleteUser=asyncErrorWrapper(async (req,res,next)=>{
    console.log("geldi")
    const {id}=req.params;

    const user=await User.findById(id);

    await user.remove();

    return res.status(200)
        .json({
            success:true,
            message:"Delete Operation Successful"
        })
});

module.exports={blockUser,deleteUser,adminOrUser};
