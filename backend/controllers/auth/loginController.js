import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import Joi from "joi";
import bcrypt from 'bcrypt';
import auth from "../../models/auth.js";
import JwtService from "../../services/JwtService.js";

const loginController = {
    async login(req,res,next){
        //validation

        const loginSchema = Joi.object({
            email:Joi.string().email().required(),
            password:Joi.string().required()      
        })

        const {error} = loginSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const {email,password} = req.body;

        //check user is exit or not in database
         try {
             const user = await auth.findOne({email})

             if (!user) {
                 return next(CustomErrorHandler.wrongCrendential());
             }

             //comapre the password
             const match = await bcrypt.compare(password,user.password);
             if (!match) {
                return next(CustomErrorHandler.wrongCrendential());
            }

            // genrate token
            const access_token = JwtService.sign({email:user.email})

            res.json({status:1,message:'sucessfuly login',email:user.email,token:access_token})

         } catch (err) {
             return next(err)
         }


    }
}

export default loginController