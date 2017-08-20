var db = require("../../models");

module.exports = function(app) {

//Create Recipe
app.post("/api/recipe", function(req, res) {
        db.Recipe.create(req.body).then(function(recipe) {
            res.json(recipe);
        });
    });
//Get All Recipes
 app.get("/api/recipe", function(req, res) {
        db.Recipe.findAll().then(function(recipe) {
            res.json(recipe);
        });
    });

//Update Recipe
app.put("/api/recipe", function(req, res) {
    db.Recipe.update(
    req.body,
    {
        where: {
            id: req.body.id
        }
    }).then(function(recipe) {
        res.json(recipe);

    });
});

    //Pull a specific Recipe
app.get("/api/recipe/:id", function(req,res) {
    db.Recipe.findOne({
        where: {
            id: req.params.id
        }
    }).then(function(recipe) {
        res.json(recipe);
    });
});

 // Delete Recipe
app.post("/deleterecipe",function(req, res) {
    db.Recipe.destroy({
        where: {
            id: req.body.id
        }
    }).then(function(recipe) {
        res.json(recipe);
    });
});


}