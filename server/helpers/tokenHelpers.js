const sendJwtToClient=(user,res)=>{
    //generate JWT

    const token=user.generateJwtFromUser();
    const {JWT_COOKIE,NODE_ENV}=process.env;

    return res.status(200)
        .cookie("access_token",token,{
            httpOnly:true,
            expires:new Date(Date.now(),parseInt(JWT_COOKIE)*1000*60),
            secure:NODE_ENV==="development"? false : true
        })
        .json({
            success:true,
            access_token:token,
            data:{
                name:user.name,
                email:user.email,
                id:user._id
            }
        });
};

const getAccessTokenFromHeader=(req)=>{
    //console.log("geldi")
    console.log(req.headers.cookie)
    const authorization=req.headers.cookie.split("=")[1];
    const access_token=authorization.split("=")[1];
    console.log(authorization)


    return authorization;
};

module.exports={sendJwtToClient,getAccessTokenFromHeader};
