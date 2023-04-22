

import CustomErrorHandler from "../services/CustomErrorHandler.js";
import JwtService from "../services/JwtService.js";


const auth = async (req,res,next)=>{
    let authHeader = req.headers.authorization;    
    console.log(authHeader)
    const data = await JwtService.verify(authHeader)
    if (!authHeader) {
        return next(CustomErrorHandler.unAuthorized());
    }  
    try {
        
        const data = await JwtService.verify(authHeader)
        console.log(data) 
        const user = {
           email:data.email
        }
        req.user = user;
       
        next();
        
    } catch (err) {
        return next(CustomErrorHandler.unAuthorized());
    }
}
export default auth;



 