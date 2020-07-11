const CustomError=require("../../helpers/error/CustomError");
const customErrorHandler=((err,req,res,next)=>{
    //console.log(err)
    if(err.name==="SyntaxError"){
        err=new CustomError("Unexpected Syntax",400)
    }
    if(err.name==="CastError"){
        err=new CustomError("Please provide a valid id",400)
    }
    if(err.name==="ValidationError"){
        err=new CustomError(err.message,400)
    }

    res.status(err.status || 500).json({
        success:false,
        message:err.message
    })

});

module.exports=customErrorHandler;
