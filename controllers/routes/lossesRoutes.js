var db = require("../../models");

module.exports = function(app) {
    //find all the entrys in the losses db
    app.get("/api/losses", function(req, res) {
    db.Losses.findAll().then(function(brew_db) {
      res.json(brew_db);
    });
});//end of find all
  //Create Reciept of goods for a user
    app.post("/api/losses", function(req, res) {
        db.Losses.create(req.body).then(function(losses) {
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