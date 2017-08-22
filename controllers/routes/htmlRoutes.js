module.exports = function(app, passport) {

    app.get("/inventoryadjust",isLoggedIn, isAdmin, function(req, res) {
        res.render("inventoryadjust");
    });

    app.get("/receipts",isLoggedIn, isReceipts, function(req, res) {
        res.render("receipts");
    });

    app.get("/sales",isLoggedIn, isSales, function(req, res) {
        res.render("sales");
    });

    app.get("/vendor",isLoggedIn, isReceipts, function(req, res) {
        res.render("vendor");
    });

    app.get("/beers",isLoggedIn, isAdmin, function(req, res) {
        res.render("beers");
    });

    app.get("/dashboard", isLoggedIn, function(req, res) {
        res.render("dashboard");
    });
    app.get("/user",isLoggedIn, isAdmin, function(req, res) {
        res.render("users");
    });
    app.get("/", function(req, res) {
        res.render("login");
    });

    app.post('/memberauth', mainRegisterCheck, passport.authenticate('user-local-signup', {
        successRedirect: '/dashboard',

        failureRedirect: '/'
    }

    ));

    app.post('/memberauthcreate',createRegisterCheck, passport.authenticate('user-local-create', {
        successRedirect: '/',

        failureRedirect: '/user'
    }

    ));

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',

        failureRedirect: '/',

        failureFlash: true
    }),
    function(req, res) {
        res.redirect("/dashboard");
    });
}

function isAdmin(req, res, next) {
  if (req.user.role == "admin") {
    return next();
  }
  res.redirect("/");
}

function isSales(req, res, next) {
  if (req.user.role == "sales" || req.user.role == "admin") {
    return next();
  }
  res.redirect("/");
}

function isReceipts(req, res, next) {
  if (req.user.role == "receipts" || req.user.role == "admin") {
    return next();
  }
  res.redirect("/");
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function mainRegisterCheck(req, res, next) {
    req.checkBody("firstName", "First Name is required").notEmpty();
    req.checkBody("lastName", "Last Name is required").notEmpty();
    req.checkBody("email", "Email is required").notEmpty();
    req.checkBody("email", "Email is not valid").isEmail();
    req.checkBody("password", "Password is required").notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.render('login', {
            errors: errors
        });
    } else{
        return next();
    }
}

function createRegisterCheck(req, res, next) {
    req.checkBody("firstName", "First Name is required").notEmpty();
    req.checkBody("lastName", "Last Name is required").notEmpty();
    req.checkBody("email", "Email is required").notEmpty();
    req.checkBody("email", "Email is not valid").isEmail();
    req.checkBody("password", "Password is required").notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.render('users', {
            errors: errors
        });
    } else{
        return next();
    }
}
