const mongoose = require('mongoose');
 
const userRegi = mongoose.Schema(
     {
         name:{type:String,required:true},
         last_name:{type:String,required:true},
         email:{type:String,required:true,unique:true},
         phone:{type:Number,required:true},
         address:{type:String,required:true},
         role:{type:String,default:'customer'},
     },{ timestamps:true });
 
module.exports = mongoose.model('Regi_user', userRegi);
