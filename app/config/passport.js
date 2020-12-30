const localStrategy  = require('passport-local').Strategy;
const user = require('../Schema/user-regi');

function init(passport){
passport.use(new localStrategy({usernameField:'email'}, async(email,passport,done)=>{
    //login
    console.log(email)
    //check if email exists 
    const checkUser = await user.findOne({email:email})
    if(!checkUser){

        return done(null,false,{message:'this user not authanticate'})
    }
    else{
        return done(null,checkUser,{message:'login succesfully'})
    }
    passport.serializeUser((checkUser,done)=>{
        done(null,checkUser._id);
    })
    passport.deserializeUser((id,done)=>{
        checkUser.findById(_id,(err,user)=>{
            done(err,user);
        })
    })
})

)
}
module.exports =init;