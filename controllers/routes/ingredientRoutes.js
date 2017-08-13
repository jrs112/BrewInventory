var db = require("../../models");

module.exports = function(app) {

//Create Ingredient
app.post("/api/ingredients", function(req, res) {
        db.Ingredient.create(req.body).then(function(ingredient) {
            res.json(ingredient);
        });
    });
//Get All Ingredients
 app.get("/api/ingredients", function(req, res) {
        db.Ingredient.findAll().then(function(ingredient) {
            res.json(ingredient);
        });
    });

//Update Ingredient
app.put("/api/ingredients", function(req, res) {
    db.Ingredient.update(
    req.body,
    {
        where: {
            id: req.body.id
        }
    }).then(function(ingredient) {
        res.json(ingredient);

    });
});

 // Delete Ingredient
app.post("/deleteingredient",function(req, res) {
    db.Ingredient.destroy({
        where: {
            id: req.body.id
        }
    }).then(function(ingredient) {
        res.json(ingredient);
    });
});


}