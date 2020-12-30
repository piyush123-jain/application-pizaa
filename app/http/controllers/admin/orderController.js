const order = require('../../../Schema/order');
function AdminOrderController(){
    return {
        index(req,res){
            order.find({status:{$ne:'completed'}}
            ,null,
            {sort:{'createdAt':-1}})
            .populate('customerId')
            .exec((err,orders)=>{
                if(req.xhr){
                    
                    return res.json(orders);
                }
                return res.render('admin/order');
            })       
        }



    }
}
module.exports = AdminOrderController;