const db = require('../../config/database');
const productSchema = require('../../Schema/product');
const Regi_user = require('../../Schema/user-regi');
const passport = require('passport');

function authController() {
    function _getRedirectUrl(req){
            return req.session.role == 'admin'?'/admin':'/cart';
    }

    return {
        // http://localhost:3100/login
        login(req, res) {

            res.render('auth/login');
        },
        // http://localhost:3100/regi
        regi(req, res) {
            res.render('auth/regi');
        },

        // http://localhost:3100/showAllProduct 

        // fetch all item from database 
        async showAllProduct(req, res) {
            const pizzaItem = await productSchema.find()
            return res.send(pizzaItem);
        },

        // regestration user    
        regiestration(req, res) {
            console.log(req.session)
            // validation user data
            const { name, last_name, email, phone, address } = req.body;
            if (!name || !last_name || !email || !phone || !address) {
                req.flash('error', 'all field are required');
                req.flash('name', name);
                req.flash('last_name', last_name);
                req.flash('email', email);
                req.flash('phone', phone);
                req.flash('address', address);
                return res.render('auth/regi');
            }

            // check user 
            Regi_user.find({ email: email }).then(result => {
                if (result.length != 0) {
                    req.flash('error', 'this email exits');
                    res.render('auth/regi');
                }
                else {
                    var regi_user = new Regi_user({
                        name,
                        last_name,
                        email,
                        address,
                        phone,
                    });
                    // create new  user
                    regi_user.save().then(result => {
                        req.flash('success', 'Data submited succefully')
                            // req.session.cart.cartBooleanValue = true;
                            req.session.loginUser = email;
                        console.log(req.session)
                            res.redirect('/');
                    }).catch(err => {
                        console.log(err)
                        req.flash('error', 'some thing goes wrong');
                        res.render('auth/regi');
                    }
                    );
                }
            })
                .catch(err => console.log(err));

        },
        // user login 
        userLogin(req, res, next) {
            //validation user input 
            const { email, phone } = req.body;
            if ( !email || !phone) {
                req.flash('error', 'all field are required');
                req.flash('email', email);
                req.flash('phone', phone);
                return res.render('auth/login');
            }
       // check user exits or not
        Regi_user.findOne({ email: req.body.email, phone: req.body.phone })
                 .then((result) => {
                    if (result == null) {
                        
                        req.flash('error', 'You Are Not Authorized Person');
                        res.render('auth/login');
                    }
                    else {

                        req.session.loginUser_id = result._id;
                        req.session.role = result.role;
                        
                        res.redirect(_getRedirectUrl(req));
                        

                    }
                })
                .catch(err => {
                    console.log(err);
                })
        },

    // user logout  
        userLogout(req,res){
            req.session.loginUser_id = undefined;  
            res.redirect('/');
        },
        
    }
}
module.exports = authController;


// this help to download file or image with nodejs header

// issue resolved by stackOverflow https://stackoverflow.com/a/63701592/11345235
// const { size } = fs.statSync(users[0].imgPath);
// console.log(size)
//             res.writeHead(200, {
//                 'Content-Type': 'image/png',
//                 'Content-Length': size,
//                 'Content-Disposition': `attachment; filename='demo.png`
//             });

//             fs.createReadStream(users[0].imgPath).pipe(res);