var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../db/User');

module.exports = function(passport){
    console.log("route called...");
    router.post('/signup', function(req, res){
        var username =  req.body.username;
        var password = req.body.password;
        var password1 = req.body.password1;
        
        if(password != password1)
            res.status(500).send("Password Not Matched..");
        
        User.findOne({username : username}, function(err, doc){
            console.log("find one called...");
            if(err) res.status(500).send('error occured');
            else{
                if(doc)    
                    res.status(500).send('User alrady exists');
                else{
                    var newUser = new User();
                    newUser.username = username;
                    newUser.password = newUser.hashPassword(password);
                    newUser.save(function(err, user){
                        if(err) res.status(500).send('error occured');
                        else{
                            res.send(user);
                        }
                    });
                }
            }
            
        });
        
    });
    return router;
}