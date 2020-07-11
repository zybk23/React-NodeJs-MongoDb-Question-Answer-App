
const asyncErrorWrapper=require("express-async-handler");
const {sendJwtToClient}=require("../helpers/tokenHelpers");
const User=require("../models/User");
const {validateUserInput,comparePassword}=require("../helpers/input/inputHelpers");
const CustomError=require("../helpers/error/CustomError");
const sendMail=require("../helpers/libraries/sendEmail");




const register=asyncErrorWrapper(async (req,res)=>{

    const {name,email,role,password}=req.body;
    const user=await User.create({
       name,
        email,
        role,
        password
    });

    sendJwtToClient(user,res);
});

const login=asyncErrorWrapper(async (req,res,next)=>{

    const{email,password}=req.body;

    if(!validateUserInput(email,password)){
        return next(new CustomError("Please check your inputs",400))
    }


    const user=await User.findOne({email}).select("+password");
    if(!comparePassword(password,user.password)){
        return next(new CustomError("Please check your credentials",400));
    }

    sendJwtToClient(user,res)



});

const logout=asyncErrorWrapper(async (req,res,next)=>{
    const {NODE_ENV}=process.env;

    return res.status(200)
        .cookie({
            httpOnly : true,
            expires:new Date(Date.now()),
            secure:NODE_ENV=== "development" ? false : true
        })
        .json({
            success:true,
            message:"Logout SuccessFull"
        });
});

const imageUpload=asyncErrorWrapper(async (req,res,next)=>{

    const user=await User.findByIdAndUpdate(req.user.id,{
        "profile_image":req.savedProfileImage
    },{
        new:true,
        runValidators:true
    });
    res.status(200)
        .json({
            success:true,
            message:"success",
            data:user
        })
});

const forgotPassword=asyncErrorWrapper(async (req,res,next)=>{
    const resetEmail=req.body.email;

    const user=await User.findOne({email:resetEmail});
    if(!user){
        return next(new CustomError("There is no user with that email",400))
    }
    const resetPasswordToken=user.getResetPasswordTokenFromUser();

    const resetPasswordUrl=`http://localhost:5000/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;

    const emailTemplate=`
    <h3> Reset Your Password</h3>
    <p>This <a href='${resetPasswordUrl}' target ='_blank'>Link</a>will expire in 1 hour</p>
    `;

    try{
        await sendMail({
            from:process.env.SMTP_USER,
            to:resetEmail,
            subject:"Reset Your Password",
            html:emailTemplate
        });
        return res.status(200)
            .json({
                success:true,
                message:"Email sent token"
            })
    }
    catch {
        user.resetPasswordToken=null;
        user.resetPasswordExpire=null;
        await user.save();
        return next(new CustomError("Email could not be sent",500))
    }

});
const resetPassword=asyncErrorWrapper(async (req,res,next)=>{

    const {resetPasswordToken}=req.query;
    const {password}=req.body;

});


module.exports={register,login,logout,imageUpload,forgotPassword,resetPassword};
