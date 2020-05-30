var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//for first sign up
router.post('/signup', function(req,res,next){
  User.findOne({username: req.body.username})
  .then((user)=>{
    if(user!=null){ //if username is already used.
      var err = new Error ("User "+req.body.username+" already exists");
      err.status = 403;
      next(err);
    }else{
      return User.create({
        username: req.body.username,
        password: req.body.password
      })
    }
  })
  .then((user)=>{ //once user has been created
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({status: "Registered successfully!", user: user})
    res.redirect('/');
  }, (err)=>{next(err)})
  .catch((err)=>{next(err)})
})

//for login
router.post('/login', (req,res,next)=>{
  if(!req.session.user){ //if no session started, look for username and pw
    var authHeader = req.headers.authorization;
    if(!authHeader){ //in case there is no authorization
      console.log("no auth header")
      var err = new Error("Authorization not provided");
      //res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      next(err);
    }
    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(":");
    var username = auth[0];
    var password = auth[1];
    console.log("username and password", username, password);

    //if we get here it means a password and username were supplied
    User.findOne({username: username})
    .then((user)=>{
      if(user===null){
        var err = new Error("Username "+username+" does not exist");
        err.status = 403;
        return next(err);
      } else if(user.password !== password){
        var err = new Error("Password incorrect");
        err.status = 403;
        return next(err);
      } else if(user.username===username && user.password===password){
        req.session.user = 'authenticated';
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end("You are authenticated");
        res.redirect('/');     
      }
    }).catch((err)=>{
      next(err);
    })
  }else{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end("You are ALREADY authenticated");   
  }
});

router.get('/logout', (req,res)=>{
  if(req.session){
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/index.html');
  } else{
    var err = new Error("You're not logged in.");
    err.status = 403;
    next(err);
  }
})

module.exports = router;
