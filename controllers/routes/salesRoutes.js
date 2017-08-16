var db = require("../../models");

module.exports = function(app) {

//Create Sale
app.post("/api/sales", function(req, res) {
        db.Sales.create(req.body).then(function(sales) {
            var addTransaction = {
                id: req.user.id,
                transaction_counter: req.user.transaction_counter + 1
            }
            db.User.update(
                addTransaction,
                {
                    where: {
                        id: addTransaction.id
                    }
                }).then(function(response) {
                    res.json(response);
            });
        });
    });
//Get All sales
 app.get("/api/sales", function(req, res) {
        var query = {};
        db.Sales.findAll({
            include: [db.User],
            where: query
        }).then(function(sales) {
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