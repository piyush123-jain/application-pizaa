function guest(req,res,next){
if(req.session.loginUser_id == undefined){
    return next()
}
return res.redirect('/');
}
module.exports = guest;