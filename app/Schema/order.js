const mongoose = require('mongoose');
const product = require('../Schema/product') 
const OrderSchema = mongoose.Schema(
     {
        customerId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Regi_user', 
                required:true  
                   },
        items:{type:Object,required:true},
        phone:{type:String,required:true},
        email:{type:String,required:true},
        paymentType:{type:String,default:'COD'},
        status:{type:String,default:'order_placed'},


        },{ timestamps:true });
 
module.exports = mongoose.model('orders', OrderSchema);
