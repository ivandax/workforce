const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Profiles = require('../models/profiles');

const profileRouter = express.Router();

profileRouter.use(bodyParser.json());

profileRouter.route('/').
get( (req, res, next)=>{ //getting or reading from database
    Profiles.find({})
    .then((profiles) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(profiles);
    }, (err)=>{next(err)})
    .catch((err)=>{next(err)});
}).
post((req,res,next)=>{ //posting new item to collection
    Profiles.create(req.body)
    .then((profile)=>{
        console.log("Post of profile ",profile);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(profile);
    }, (err)=>{next(err)})
    .catch((err)=>{next(err)});
}).
put((req,res,next)=>{
    res.statusCode = 403; //no updating on a whole collection, not supported
    res.end("Put operation not supported")
}).
delete((req,res,next)=>{ //dangerous op
    Profiles.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(resp); 
    }, (err)=>{next(err)})
    .catch((err)=>{next(err)});
});

//for :id

profileRouter.route('/:profileId').
get((req, res, next)=>{
    Profiles.findById(req.params.profileId)
    .then((profile) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(profile);
    }, (err)=>{next(err)})
    .catch((err)=>{next(err)});
}).
post((req,res,next)=>{
    res.statusCode = 403;
    res.end("Post operation on single item not supported - "+req.params.profileId);
}).
put((req,res,next)=>{
    Profiles.findByIdAndUpdate(req.params.profileId, {
        $set: req.body
    }, {new: true})
    .then((profile)=>{
        console.log("Post of Promo ",profile);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(profile);
    }, (err)=>{next(err)})
    .catch((err)=>{next(err)});
}).
delete((req,res,next)=>{
    Profiles.findByIdAndRemove(req.params.profileId)
    .then((profile)=>{
        console.log("Delete of Promo ",profile);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(profile);
    }, (err)=>{next(err)})
    .catch((err)=>{next(err)});
})

module.exports = profileRouter;