const jwt =require("jsonwebtoken");

function authticate(req,res,next){
  const auth=req.headers.authorization;
  if(!auth){
    return res.status(401).json("not Token");
  }
  const token =auth.split('')[1];

  try{
    const verifyToken=jwt.verify(token,process.env.JWT_TOKEN);
    req.user=verifyToken;
    next();
  }
  catch(err){
    req.status.send("Invalid token", err);
  }
  
}

module.exports= authticate;