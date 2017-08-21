displayVendorsTable();


function displayVendorsTable() {
  $("#currentVendorsDisplay").empty();

//Display Vendors Table
$.get("/api/vendors", function(request) {
  $.get("/api/userinfo", function(req) {
  console.log(request);

      var tableRowOne = $("<tr>");;
      var vendorNameHead = $("<th>");
      vendorNameHead.addClass("tableRowHeadStyle");
      vendorNameHead.text("Vendor Name")
      tableRowOne.append(vendorNameHead);

      //Phone Column Header
      var phoneNumberHead = $("<th>");
      phoneNumberHead.addClass("tableRowHeadStyle");
      phoneNumberHead.text("Phone Number");
      tableRowOne.append(phoneNumberHead);

      //Email Column Header
      var emailHead = $("<th>");
      emailHead.addClass("tableRowHeadStyle");
      emailHead.text("Email")
      tableRowOne.append(emailHead);

      //Address Name Column Header
      var addressHead = $("<th>");
      addressHead.addClass("tableRowHeadStyle");
      addressHead.text("Address")
      tableRowOne.append(addressHead);

      //City Column Header
      var cityHead = $("<th>");
      cityHead.addClass("tableRowHeadStyle");
      cityHead.text("City");
      tableRowOne.append(cityHead);
      //State Column Header
      var stateHead = $("<th>");
      stateHead.addClass("tableRowHeadStyle");
      stateHead.text("State");
      tableRowOne.append(stateHead);
      //Zip Column Header
      var zipHead = $("<th>");
      zipHead.addClass("tableRowHeadStyle");
      zipHead.text("Zip");
      tableRowOne.append(zipHead);


      $("#currentVendorsDisplay").append(tableRowOne);

    for (var i = 0; i < request.length; i++) {


      var tableRow = $("<tr>");
      //first name column
      var vendorName = $("<td>");
      vendorName.addClass("tableRowStyle");
      vendorName.append(request[i].vendorname);
      tableRow.append(vendorName);

      // last name column

      var phoneNumber = $("<td>");
      phoneNumber.addClass("tableRowStyle");
      phoneNumber.append(request[i].telephone_number);
      tableRow.append(phoneNumber);

      //Email column
      var email = $("<td>");
      email.addClass("tableRowStyle");
      email.append(request[i].email);
      tableRow.append(email);

      //Role Column
      var address = $("<td>");
      address.addClass("tableRowStyle");
      address.append(request[i].address);
      tableRow.append(address);

      //City Column
      var city = $("<td>");
      city.addClass("tableRowStyle");
      city.append(request[i].city);
      tableRow.append(city);

      //state Column
      var state = $("<td>");
      state.addClass("tableRowStyle");
      state.append(request[i].state);
      tableRow.append(state);

      //zip Column
      var zip = $("<td>");
      zip.addClass("tableRowStyle");
      zip.append(request[i].zip);
      tableRow.append(zip);


      $("#currentVendorsDisplay").append(tableRow);

    }


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