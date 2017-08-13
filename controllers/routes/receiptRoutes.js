var db = require("../../models");

module.exports = function(app) {
    //find all the entrys in the reciept db
    app.get("/api/receipt", function(req, res) {
    db.receipt.findAll().then(function(brew_db) {
      res.json(brew_db);
    });
});//end of find all
  //Create Reciept of goods for a user
	app.post("/api/receipt", function(req, res) {
    db.Receipt.create({
      ingredient: req.body.ingredient,
      quantity: req.body.quantity,
      VendorMasterId: req.body.vendorname

    }).then(function(recipe) {
            res.redirect("/receipts");
    });

  });//end of create



}//end of exports