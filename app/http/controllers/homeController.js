const Menu = require('../../Schema/menu')
function homeController(){
    return {
       async index(req,res){
            const pizaa = await Menu.find();
            return res.render('home',{pizaas:pizaa})
        },



    }
}
module.exports = homeController;