var db = require("../../models");

module.exports = function(app) {
    //find all the entrys in the reciept db
    app.get("/api/vendors", function(req, res) {
    db.VendorMaster.findAll().then(function(brew_db) {
      res.json(brew_db);
    });
});//end of find all
  // update quanity

  //Create Reciept of goods for a user
	app.post("/vendor", function(req, res) {
    console.log(req.body);
    db.VendorMaster.create({
      vendorname: req.body.vendorname,
      telephone_number: req.body.telephone_number,
      email: req.body.email,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip
    }).then(function(vendors) {
      var server_message = "Vendor Created!";
      res.render("vendor", {server_message});
    });

  });//end of create



}//end of exports