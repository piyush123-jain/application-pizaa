
function cartController() {
    return {

        index(req, res){
            res.send({cartItem:req.session.cart});
        },

        cart(req,res){

            res.render('customers/cart');
        },

        update_cart(req, res) {
        if(!req.session.cart)
        {
            req.session.cart = {
                items:{ },
                totalAmount:0,
                totalQty:0,
            }
        }
        let cart  = req.session.cart;
        if(!cart.items[req.body._id])
        {
            cart.items[req.body._id] = {
                item:req.body,
                qty:1,
            }
            cart.totalQty += cart.items[req.body._id].qty
            cart.totalAmount += parseInt(req.body.price)

        }
        else{
            cart.items[req.body._id].qty += 1;
            cart.totalQty += 1
            cart.totalAmount += parseInt(req.body.price);
        }
        return res.json({totalqty:cart.totalQty})
    }
}}
module.exports = cartController;

