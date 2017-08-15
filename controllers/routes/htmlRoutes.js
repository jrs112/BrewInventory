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

    app.post('/memberauth', passport.authenticate('user-local-signup', {
        successRedirect: '/dashboard',

        failureRedirect: '/'
    }

    ));

    app.post('/memberauthcreate', passport.authenticate('user-local-create', {
        successRedirect: '/',

        failureRedirect: '/user'
    }

    ));

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',

        failureRedirect: '/'
    }

    ));
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