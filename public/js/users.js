displayUserTable();


function displayUserTable() {
  $("#currentUsersDisplay").empty();

//Display Users Table
$.get("/api/users", function(request) {
  $.get("/api/userinfo", function(req) {
  console.log(request);

      var tableRowOne = $("<tr>");;
      var firstNameHead = $("<th>");
      firstNameHead.addClass("tableRowHeadStyle");
      firstNameHead.text("First Name")
      tableRowOne.append(firstNameHead);

      //Last Name Column Header
      var lastNameHead = $("<th>");
      lastNameHead.addClass("tableRowHeadStyle");
      lastNameHead.text("Last Name")
      tableRowOne.append(lastNameHead);

      //Last Name Column Header
      var emailHead = $("<th>");
      emailHead.addClass("tableRowHeadStyle");
      emailHead.text("Email")
      tableRowOne.append(emailHead);

      //Role Name Column Header
      var roleHead = $("<th>");
      roleHead.addClass("tableRowHeadStyle");
      roleHead.text("Role")
      tableRowOne.append(roleHead);

      //Options Column Header
      var optionsHead = $("<th>");
      optionsHead.addClass("tableRowHeadStyle");
      optionsHead.text("Options")
      tableRowOne.append(optionsHead);

      $("#currentUsersDisplay").append(tableRowOne);

    for (var i = 0; i < request.length; i++) {


      var tableRow = $("<tr>");
      //first name column
      var firstName = $("<td>");
      firstName.addClass("tableRowStyle");
      firstName.append(request[i].first_name);
      tableRow.append(firstName);

      // last name column

      var lastName = $("<td>");
      lastName.addClass("tableRowStyle");
      lastName.append(request[i].last_name);
      tableRow.append(lastName);

      //Email column
      var email = $("<td>");
      email.addClass("tableRowStyle");
      email.append(request[i].email);
      tableRow.append(email);

      //Role Column
      var role = $("<td>");
      role.addClass("tableRowStyle");
      role.append(request[i].role);
      tableRow.append(role);

       //options column

      var options = $("<td>");
      options.addClass("tableRowStyle");
      if (req.main_admin == false) {
          if (request[i].role == "admin") {
            options.html("<p>Only the main Administrator can make changes to admin accounts.</p>");
          }
          else {
          options.html("<input class='btn btn-primary updateBtn btn-xs' data-id='" + request[i].id + "' value='Update'>" +
                      "<input class='btn btn-danger deleteBtn btn-xs + data-id='" + request[i].id + "' value='Delete'>");
          }
      } else{
      options.html("<button class='btn btn-primary updateBtn btn-xs' data-id='" + request[i].id + "' value='Update'>Update</button>" +
                      "<button class='btn btn-danger deleteBtn btn-xs' + data-id='" + request[i].id + "' value='Delete'>Delete</button>");
    }
      tableRow.append(options);
      $("#currentUsersDisplay").append(tableRow);

    }

    $(".deleteBtn").on("click", function(event) {
            event.preventDefault();
            console.log($(this).attr("data-id"));
            var delUserID = {
                id: $(this).attr("data-id"),
            };
            console.log(delUserID);
            deleteUser(delUserID);

        });

    $(".updateBtn").on("click", function(event) {
            event.preventDefault();
            $("#currentUsersDisplay").empty();

            console.log($(this).attr("data-id"));
            var updateUserID = {
                id: $(this).attr("data-id"),

            };
            $.get("/api/users/" + updateUserID.id)
            .done(function(data) {
              console.log(data);
              var wellSection = $("<div>");
              wellSection.attr("id", "userWell");
              $("#currentUsersDisplay").append(wellSection);
              $("#userWell").append("<div class='col-md-3'></div><div class='col-md-6'><h2 class='header'>Update: " + data.first_name + " " + data.last_name + "</h2>" +
                                    "<h3 class='header'>Email: " + data.email + "</h3><h3 class='header'>Role: " + data.role + "</h3>" +

                                    "<div class='form-group'> <label>Update First Name: </label><input type='text' class='form-control' id='firstNameInfo'></div>" +
                                    "<div class='form-group'> <label>Update Last Name: </label><input type='text' class='form-control' id='lastNameInfo'></div>" +
                                    "<div class='form-group'> <label>Update Email: </label><input class='form-control' id='emailInfo'></div>" +
                                    "<div class='form-group'> <label>Update Role: </label><select id='userRoleInfo' class='form-control'><option value='noChange'>No Change</option>" +
                                    "<option value='admin'>Admin</option><option value='sales'>Sales</option><option value='receipts'>Receipts</option></select></div>" +
                                    "<button class='btn btn-primary form-group updateUserBtn'>Update Account</button><button class='btn btn-warning form-group listBtn'>Back to Users Table</button></div><div class='col-md-3'></div>");
              // focus on current users
              document.location.href = "#currentUsersDisplay";

              $(".listBtn").on("click", function(backEvent) {
                backEvent.preventDefault();
                displayUserTable();
                document.location.href = "#currentUsersDisplay";
              });


              $(".updateUserBtn").on("click", function(submitEvent) {
                submitEvent.preventDefault();
                var firstNameInfo = $("#firstNameInfo").val().trim();
                var lastNameInfo = $("#lastNameInfo").val().trim();
                var emailInfo = $("#emailInfo").val().trim();
                var userRoleInfo = $("#userRoleInfo").val().trim();
                console.log(firstNameInfo);
                var updateUserInfo = {
                  id: data.id
                }
                if (firstNameInfo != "") {
                  updateUserInfo["first_name"] = firstNameInfo;
                }
                if (lastNameInfo != "") {
                  updateUserInfo["last_name"] = lastNameInfo;
                }
                if (emailInfo != "") {
                  updateUserInfo["email"] = emailInfo;
                }
                if (userRoleInfo != "noChange") {
                  updateUserInfo["role"] = userRoleInfo;
                }


                updateUser(updateUserInfo);

              })
              // console.log(delUserID);
              // deleteUser(delUserID);
            });

        });


  });
});

}

function deleteUser(info) {
    $.ajax({
      method: "POST",
      url: "/deleteuser",
      data: info
    })
    .done(function() {
        console.log("Deleted!");
        displayUserTable();
        document.location.href = "#currentUsersDisplay";
    });
  }


function updateUser(info) {
    $.ajax({
      method: "PUT",
      url: "/api/user",
      data: info
    })
    .done(function() {
        console.log("Updated!");
        displayUserTable();
        document.location.href = "#currentUsersDisplay";
    });
  }