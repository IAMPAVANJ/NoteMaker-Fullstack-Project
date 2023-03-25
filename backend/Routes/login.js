const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");

const secret = "SurveyForm";
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/login", async(req, res)=>{
    // console.log('api fetched')
    try{
        const {email, password} = req.body;
        const user_data = await userModel.findOne({email:email})
        if(!user_data){
            return res.status(401).send({
                status:"Failed",
                message:"Invalid Email"
            })
        }
        else{
            bcrypt.compare(password, user_data.password, (err, result)=>{
                if(!result){
                   return res.status(403).json({
                        status:"Failed",
                        message:"Invalid Password"
                    })   
                }
                else{
                    const token=jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60* 60 *60),
                        user_data: user_data._id
                      }, secret);
                    const userdetails = {...user_data._doc, password: undefined}
                    return res.status(200).json({
                        status:"Success",
                        message: {token, userdetails}
                    })
                }
            })
        }
        
    }catch(e){
        console.log(e)
    }


})
module.exports = router;