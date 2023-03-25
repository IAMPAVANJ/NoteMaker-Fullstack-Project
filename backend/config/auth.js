const jwt = require("jsonwebtoken");
const user = require("../models/registerSchema");
const secret =process.env.SECRET_KEY;


module.exports = async (req, res, next) => {
    const {authorization}= req.headers;
    console.log("hello",req.headers);

    if(!authorization){
        return res.status(401).json({error:"Please login first"})
    }


    const token = authorization.replace("Bearer ", "");
    console.log(token);

    await jwt.verify(token, secret, async(err, payload)=> {
        if(err){
            return res.status(401).json({error:"Please login to make survey"})
        }
        const {user_data}= payload;
        console.log(payload);
        const userData = await user.findById(user_data);
        console.log("userData", userData);
        if(userData){
            req.user = userData;
        }

    })
    next();
}