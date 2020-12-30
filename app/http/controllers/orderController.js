const orders  = require('../../Schema/order')
const regi_user = require('../../Schema/user-regi');
const moment  = require('moment');
const { Store } = require('express-session');
function pizzaOrder(){
    return{
     
        
         async index(req,res){

             const {phone,email} = req.body;
             if ( !email || !phone ) {
                req.flash('error', 'all field are required');
                return res.render('auth/login');
            }

             const order = new orders({
                 customerId:req.session.loginUser_id,
                 items:req.session.cart.items,
                 phone,
                 email
             })
         order.save().then(result=>{
                delete req.session.cart;
                //event
                const eventEmitter = req.app.get('eventEmitter');
                eventEmitter.emit('update_admin_dashboard',result);                
             return res.redirect('/myOrder');
         })
         .catch(err=>{

             console.log(err);
         })
     },

    async myOrder(req,res)
    {
        const order = await orders.find({customerId:req.session.loginUser_id},
                                null,
                                {sort:{'createdAt':-1}})
                                res.setHeader("Set-Cookie", ["type=ninja", "language=javascript"]);
       res.set('Cache-Control', 'no-cache,private,no-store,must-revalidate,max-stale=0,post-check=0,pre-check=0');
        return res.render('customers/customerOrder',{customerOrders:order,moment:moment});
    },
    async show(req,res){
        const order  = await orders.findById(req.params.id);
            // authorization user
        if(req.session.loginUser_id == order.customerId)
        {
            return res.render('customers/singleOrder',{order})
        }
        return res.redirect('/');
    },
    




}
}
module.exports = pizzaOrder;
