$(".mainNavBar").empty();

$.get("/api/users", function(req) {
  console.log(req);
  console.log(req.length);
  if ( req.length == 0) {
    $("#signInDisplay").html( "<h3>Welcome to Brew One!  Plese create your admin account below:</h3>" +
                              "<form class='signup' id='adminSignUp' name='userSignUp' method='post' action='/memberauth'>" +
                              "<div class='form-group'> <label>First Name: </label><input type='text' class='form-control' name='firstName'></div>" +
                              "<div class='form-group'> <label>Last Name: </label><input type='text' class='form-control' name='lastName'></div>" +
                              "<div class='form-group'> <label>Email: </label><input type='email' class='form-control' name='email'></div>" +
                              "<div class='form-group'> <label>Password: </label><input type='password' class='form-control' name='password'></div>" +
                              "<input class='btn btn-primary' type='submit' value='Create Account'></form>");
  }
});



