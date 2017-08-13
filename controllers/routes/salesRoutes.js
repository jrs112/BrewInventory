var db = require("../../models");

module.exports = function(app) {

//Create Sale
app.post("/api/sales", function(req, res) {
        db.Sales.create(req.body).then(function(sales) {
            res.json(sales);
        });
    });
//Get All sales
 app.get("/api/sales", function(req, res) {
        db.Sales.findAll().then(function(sales) {
            res.json(sales);
        });
    });

//Update sales
app.put("/api/sales", function(req, res) {
    db.Sales.update(
    req.body,
    {
        where: {
            id: req.body.id
        }
    }).then(function(sales) {
        res.json(sales);

    });
});

 // Delete sales
app.post("/deletesales",function(req, res) {
    db.Sales.destroy({
        where: {
            id: req.body.id
        }
    }).then(function(sales) {
        res.json(sales);
    });
});


}