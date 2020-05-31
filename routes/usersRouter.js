var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//for first sign up
router.post('/signup', function(req,res,next){
  //the User model already has access to passport-local-mongoose features
  User.register(new User({username: req.body.username}),
  req.body.password,
  (err,user)=>{
    if(err){
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err:err});
    }else{
      passport.authenticate('local')(req,res,()=>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true, status: "Registration successful"})
      })
    }
  })
});

//for login
router.post('/login', passport.authenticate('local'), (req,res,next)=>{
  //token allows authentication, created only on login
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: "You have logged in!"})
});

// router.get('/logout', (req,res,next)=>{
//   if(req.session){
//     req.session.destroy();
//     //res.clearCookie('session-id');
//     //res.redirect('/index.html');
//   } else{
//     var err = new Error("You're not logged in.");
//     err.status = 403;
//     next(err);
//   }
// })

module.exports = router;
