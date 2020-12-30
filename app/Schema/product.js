const mongoose = require('mongoose');
 
const productSchema = mongoose.Schema(
     {title: String,
       subtitle: String,
       description: String, 
       imageName:String,
       img:String
       
     });
 
module.exports = mongoose.model('product', productSchema);
