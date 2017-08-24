var db = require("../../models");

module.exports = function(app) {
    //find all the entrys in the reciept db
     app.get("/api/receipt", function(req, res) {
        var query = {};
        db.Receipt.findAll().then(function(teams) {
            res.json(teams);
        });
    });
  //Create Reciept of goods for a user
	app.post("/api/receipt", function(req, res) {
    db.Receipt.create(req.body).then(function(receipt) {
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

  });//end of create



}//end of exports