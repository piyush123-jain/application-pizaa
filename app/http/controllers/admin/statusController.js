const order = require('../../../Schema/order');
function statusController(){
    return {
        index(req,res){

            var x = req.body.orderId.split('>');
            req.body.orderId = x[0];

            order.updateOne({_id:req.body.orderId},{status:req.body.status},(err,result)=>
            {
                (err)?res.redirect('/admin'):'';
                //emit Event 
                const eventEmitter = req.app.get('eventEmitter');
                eventEmitter.emit('Update_Order',{id:req.body.orderId,status:req.body.status});
                return res.redirect('/admin');
            }) 

         },

        
    }


}
module.exports = statusController;