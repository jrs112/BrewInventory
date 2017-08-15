var db = require("../../models");

module.exports = function(app) {

//Create Transaction
app.post("/api/transaction", function(req, res) {
        db.Transaction.create(req.body).then(function(transaction) {
            res.json(transaction);
        });
    });
//Get All Transaction
 app.get("/api/transaction", function(req, res) {
        db.Transaction.findAll().then(function(transaction) {
            res.json(transaction);
        });
    });

//Update Transaction
app.put("/api/transaction", function(req, res) {
    db.Transaction.update(
    req.body,
    {
        where: {
            id: req.body.id
        }
    }).then(function(transaction) {
        res.json(transaction);

    });
});

 // Delete Transaction
app.post("/deletetransaction",function(req, res) {
    db.Transaction.destroy({
        where: {
            id: req.body.id
        }
    }).then(function(transaction) {
        res.json(transaction);
    });
});


}