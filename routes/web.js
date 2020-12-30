const path  = require('path');

// home Controller
const homeController = require('../app/http/controllers/homeController');
// auth Controller
const authController = require('../app/http/controllers/authController');
// cart Controllers
const cartController = require('../app/http/controllers/cartController');
// const guest = require('../app/http/middlewares/guest');
const Admin = require('../app/http/middlewares/admin');

// order controller
const orderController = require('../app/http/controllers/orderController');
// admin controller
const AdminOrderController = require('../app/http/controllers/admin/orderController');
const StatusController = require('../app/http/controllers/admin/statusController');

function initRoutes(app){

    // http://localhost:3100    
    app.get('/',homeController().index);
    
    //    authController 
    app.get('/showAllProduct',authController().showAllProduct);
    
    // fetch UI
    app.get('/login',authController().login);
    app.get('/regi',authController().regi);
    
    // register user 
    app.post('/regiestration',authController().regiestration);
    
    // login user
    app.post('/userLogin',authController().userLogin);
    app.get('/logout',authController().userLogout);
    
    //    cartController 
    app.post('/update_cart',cartController().update_cart);
    app.get('/cart_data',cartController().index);
    app.get('/cart',cartController().cart);
    
    // order controller
    app.post('/order',orderController().index);
    app.get('/myOrder',orderController().myOrder);
    app.get('/customer/order/:id',orderController().show);
    
    // admin route
    app.get('/admin',Admin,AdminOrderController().index);
    app.post('/admin/order/status',Admin,StatusController().index);
    
}
// app.post('/pizzadmin',authController().ProductUpload);

module.exports = initRoutes