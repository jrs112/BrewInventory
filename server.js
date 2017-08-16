var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require('express-handlebars');
var session = require("express-session");
var expressValidator = require('express-validator');
var passport   = require('passport');




// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models/index.js");
require("./associations")(db);

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator()); // this line must be immediately after any of the bodyParser middlewares!
app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// We need to use sessions to keep track of our user's login status


//Handlebars config
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

// Requiring our routes
require("./controllers/routes/recipeRoutes.js")(app);
require("./controllers/routes/receiptRoutes.js")(app);
require("./controllers/routes/vendorMasterRoutes.js")(app);
require("./controllers/routes/htmlRoutes.js")(app, passport);
require("./controllers/routes/ingredientRoutes.js")(app);
require("./controllers/routes/salesRoutes.js")(app);
require("./controllers/routes/userRoutes.js")(app);
require("./controllers/routes/transactionRoutes.js")(app);
require("./controllers/routes/lossesRoutes.js")(app);
//load passport strategies
require('./config/passport.js')(passport);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync({force: false}).then(function() {
  app.listen(PORT, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
  });
});