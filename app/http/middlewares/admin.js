function Admin(req,res,next){
    console.log();
    if(req.session.role === "admin"){
        return next();
    }
    return res.redirect('/');
    }
    module.exports = Admin;