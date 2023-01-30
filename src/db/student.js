const mongoose=require("mongoose");
const validator=require("validator");

const studentSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        minLength:3,
    },
    secondname:{
        type:String,
        required:true,
        minLength:3,
    },
    password:{
       type:String,
       required:true,
       minLength:8
    },
    phonenumber:{
        type:Number,
        required:true,
        minLength:11,
        unique:[true,'phone number already exist'],
    },
    address:{
        type:String,
        required:true,
        minLength:5,
    }
})

const Student = new mongoose.model('Student',studentSchema)
module.exports=Student