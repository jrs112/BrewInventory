//load bcrypt
var bCrypt = require('bcrypt-nodejs');
var db = require("../models");
module.exports = function(passport, user) {

    var LocalStrategy = require('passport-local').Strategy;

    var User = user;

//Initial Admin Account Strategy

passport.use('user-local-signup', new LocalStrategy(

    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback

    },
    function(req, email, password, done) {
        var generateHash = function(password) {

        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

        };
        db.User.findOne({
        where: {
            email: email
        }
        }).then(function(user) {

            if (user)

            {
                console.log("that email is already taken");

                return done(null, false, {
                    message: 'That email is already taken'
                });

            } else

            {

                var userPassword = generateHash(password);

                var data =

                    {
                        email: email,

                        password: userPassword,

                        first_name: req.body.firstName,

                        last_name: req.body.lastName,

                        role: "admin",

                        main_admin: true

                    };


                db.User.create(data).then(function(newUser, created) {

                    if (!newUser) {

                        return done(null, false);

                    }

                    if (newUser) {

                        return done(null, newUser);

                    }

                });

            }

        });
    }

));

    //serialize
    passport.serializeUser(function(user, done) {

        done(null, user.id);

    });

    // deserialize user
passport.deserializeUser(function(id, done) {

    db.User.findById(id).then(function(user) {

        if (user) {

            done(null, user.get());

        } else {

            done(user.errors, null);

        }

    });

});

//Create Account
passport.use('user-local-create', new LocalStrategy(

    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback

    },
    function(req, email, password, done) {
        var generateHash = function(password) {

        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

        };
        db.User.findOne({
        where: {
            email: email
        }
        }).then(function(user) {

            if (user)

            {
                console.log("that email is already taken");

                return done(null, false, {
                    message: 'That email is already taken'
                });

            } else

            {

                var userPassword = generateHash(password);

                var data =

                    {
                        email: email,

                        password: userPassword,

                        first_name: req.body.firstName,

                        last_name: req.body.lastName,

                        role: req.body.roleType

                    };


                db.User.create(data).then(function(newUser, created) {

                    if (!newUser) {

                        return done(null, false);

                    }

                    if (newUser) {

                        return done(null, created);

                    }

                });

            }

        });
    }

));

    //serialize
    passport.serializeUser(function(user, done) {

        done(null, user.id);

    });

    // deserialize user
passport.deserializeUser(function(id, done) {

    db.User.findById(id).then(function(user) {

        if (user) {

            done(null, user.get());

        } else {

            done(user.errors, null);

        }

    });

});


//LOCAL SIGNIN
passport.use('local-signin', new LocalStrategy(

    {

        // by default, local strategy uses username and password, we will override with email

        usernameField: 'email',

        passwordField: 'password',

        passReqToCallback: true // allows us to pass back the entire request to the callback

    },


    function(req, email, password, done) {

        var User = user;

        var isValidPassword = function(userpass, password) {

            return bCrypt.compareSync(password, userpass);

        }

        db.User.findOne({
            where: {
                email: email
            }
        }).then(function(user) {

            if (!user) {

                return done(null, false, {
                    message: 'Email does not exist'
                });

            }

            if (!isValidPassword(user.password, password)) {

                return done(null, false, {
                    message: 'Incorrect password.'
                });

            }


            var userinfo = user.get();
            return done(null, userinfo);


        }).catch(function(err) {

            console.log("Error:", err);

            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });

        });


    }

));

}