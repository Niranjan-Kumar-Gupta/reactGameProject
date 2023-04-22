import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import Joi from "joi";
import bcrypt from 'bcrypt';
import JwtService from "../../services/JwtService.js";
import user from "../../models/user.js";

const userInfoController = {
    async userInfoCreate(req,res,next){
       console.log(req.body)
       const {email,
            avgTime,
            deadCounts,
            acc,
            softSkills} = req.body;

       const userInfo = new user({
            email,
            avgTime,
            deadCounts,
            acc,
            softSkills
        })

    try {
        const result = await userInfo.save();
        res.json({result})
    } catch (err) {
        return next(err)
    }

    },
    async userInfoGet(req,res,next){
       
        try {
            const result = await user.find();
            res.json({result})
        } catch (err) {
            return next(err)
        }
    
     },
    async userInfoGetById(req,res,next){
     
        try {
            // console.log(req.params)
            const candidate = await user.findById(req.params._id)
            res.json(candidate)
        } catch (error) {
            return next(error)
        }
      
 
     }
}

export default userInfoController