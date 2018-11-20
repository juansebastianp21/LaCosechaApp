const User = require('../models/user.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.user_singup = function (req, res, next){
    User.find({email: req.body.email }).exec().then(
        user => {
            if(user.length >= 1){
                return res.status(409).json({
                    message: 'Mail exist'
                });
            }else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err){
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        let user = new User (
                            {
                                _id: new mongoose.Types.ObjectId(),
                                email: req.body.email,
                                password: hash
                            }
                        ); 
                        user.save().then(result => {
                            res.status(201).json({
                                message: 'User creado'
                            });
                        })
                        .catch(err => {
                            res.status(500).json({
                                error: err
                            });
                        });
                    }
                }) 
            }
        }
    ).catch();
    
};


exports.user_login = function (req, res, next) {

    User.find({email: req.body.email})
    .exec()
    .then(user =>{
        if (user.length < 1){
            return res.status(401).json({
                message: 'Email o contraseña incorrecta'
            });
        }
        bcrypt.compare(req.body.password,user[0].password, (err, result) =>{
            if(err){
                return res.status(401).json({
                    message: 'Login failed bad pass'
                });
            }
            if (result) {
                const token =  jwt.sign({
                    email: user[0].email,
                    userId: user[0]._id
                },
                'secret',
                {
                    expiresIn: "1h"
                }
                );
                return res.status(200).json({
                    message: 'Autenticacion exitosa',
                    flag: 1,
                    token: token
                });
            }
            return res.status(401).json({
                message: 'Login failed',
                flag: 0,
            });
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};