const express = require('express')
const User = require("../models/user")
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')


// router.get('/login', (req, res) => res.render('login', { layout: 'landing'}))
// router.get('/register', (req, res) => res.render('register', { layout: 'landing'}))

router.post('/register' , (req, res) => {
   const { email, password, password2 } = req.body
   let errors = [] 

    if (!email || !password || !password2) {
        errors.push({ msg: 'Registation Failed. Fill in all fields.'})
    } else if(password !== password2) {
        errors.push({ msg: 'Registation Failed. Passwords do not match.'})
    } else if(password.length < 4) {
        errors.push({ msg: 'Registation Failed. Passwords must be at least 4 characters.'})
    }

    if(errors.length > 0) {
        // res.render('register' , { layout: 'landing', errors, email, password, password2})
            
    } else {
        User.findOne({ where: { email }})
        .then(user => {
            if(user) {
                errors.push({ msg: 'Registation Failed. User email already exists.'})
                // res.render('register' , { layout: 'landing', errors, email, password, password2})
            } else {
                const newUser = {
                    email,
                    password
                }
                bcrypt.genSalt(10, (err,salt) => bcrypt.hash(newUser.password, salt, (err,hash) => {
                    if (err) throw err;
                        newUser.password = hash
                        user = new User({
                            email: newUser.email,
                            password: newUser.password
                        })

                        user.save()
                        .then(user => {
                            // req.flash('success_msg', 'You have successfully registered.')
                            res.redirect('/users/login')
                        
                        })
                        .catch(err => console.log(err))
                }))
            }
        })
    }

})


router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/users/dashboard',
      failureRedirect: '/users/login',
      failureFlash: true
    }) (req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You have sucessfully logged out.')
    res.redirect('/users/login');
});


module.exports = router