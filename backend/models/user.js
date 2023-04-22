
import mongoose  from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({  
    email:{type:String,required:true,unique:true},
    avgTime:{type:String},
    deadCounts:{type:String},
    acc:{type:String},
    softSkills:{type:String}
},{timestamps:true});

export default mongoose.model('Candidate',UserSchema,'candidates')
