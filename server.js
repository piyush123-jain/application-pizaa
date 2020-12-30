// import enviorement file
 
require('dotenv').config();
const express = require('express');
const path  = require('path');
const app  = express();

const Port  = process.env.port || 3100;
// session import 
var session = require('express-session');
var cookieParser = require('cookie-parser');
const flash = require('express-flash');
const { connection } = require('mongoose');
const expressEjsLayouts = require('express-ejs-layouts');
const passport = require('passport')
const passportInit = require('./app/config/passport');

const MongoDbStore = require('connect-mongo')(session); 
const eventEmitters = require('events');
app.set('view engine', 'ejs')
app.use(express.json({limit: '50mb'}));

app.use(express.json())
app.use(express.urlencoded( {limit: '50mb'} ));
app.use(expressEjsLayouts);
app.use(express.static('public'));




app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
  });
  
  app.use(cookieParser());

  // set the view path 
app.set('views',path.join(__dirname,'/resources/views'));


let SessionStore = new MongoDbStore({
  mongooseConnection:connection,
  collection:'session',
  _id : false
})
 // event Emitter
const eventEmitter = new eventEmitters()
app.set('eventEmitter',eventEmitter);
 
// initialize passport
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());


app.use(session(
  {
    secret:'hello world',
    saveUninitialized: false,
    resave:false,
    secure: false, httpOnly: true,
    store:SessionStore,
    cookie:{maxAge:1000*60*60*24}
}));


app.use(flash())


  app.use((req,res,next)=>{
    res.locals.user = req.user;
    res.locals.session = req.session;
  next();
  })
  require('./routes/web')(app);
// set the url 
let url = 'http://localhost:';


// define the browser 
const  server = app.listen(Port,()=>{
    console.log(`server listen on ${url}${Port}`);
})
const io =  require('socket.io')(server);
io.on('connection',(socket)=>{
  socket.on('join',(id)=>{
    socket.join(id);

  })
})
eventEmitter.on('Update_Order',(updated_data)=>{
  io.to(`order_${updated_data.id}`).emit('updated_data',updated_data);
})
eventEmitter.on('update_admin_dashboard',(updated_data)=>{

  io.to('admin_room').emit('updated_data',updated_data);
})

