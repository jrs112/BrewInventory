var db = require("../../models");

module.exports = function(app) {
//Get info of user currently logged in
app.get("/api/userinfo", function(req, res) {
    res.json(req.user);
  });

//Update user
app.put("/api/user", function(req, res) {
    db.User.update(
    req.body,
    {
        where: {
            id: req.body.id
        }
    }).then(function(users) {
        res.json(users);

    });
});

//Return all users
    app.get("/api/users", function(req, res) {
        db.User.findAll().then(function(users) {
            res.json(users);
        });
    });

    //Pull a specific user
app.get("/api/users/:id", function(req,res) {
    db.User.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(booksDb) {
        res.json(booksDb);
    });
});

//log out user
app.get("/logout", function(req, res) {
    req.session.destroy(function(err) {

        res.redirect('/');

    });
});

//delete user
app.post("/deleteuser",function(req, res) {
    console.log(req.body.id);
    db.User.destroy({
        where: {
            id: req.body.id
        }
    }).then(function(user) {
        res.json(user);
    });
});

}
