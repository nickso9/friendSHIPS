const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const db = require("../models")

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: "email" } , (email, password, done) => {
            db.users.findOne({ where: { email }})
            .then(user => {
                if(!user) {
                    return done(null, false, { message: 'Email or Password incorrect.'})
                }

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if(isMatch) {
                        return done(null, user)
                    } else {
                        return done(null, false, { message: 'Email or Password incorrect.'})
                    }
                })



            })
            .catch(err => console.log(err))
        })
    )

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    

    passport.deserializeUser(function (id, done) {
        db.users.findOne({ where: { id: id } }).then((user) => {
          done(null, user);
        });
      });

}