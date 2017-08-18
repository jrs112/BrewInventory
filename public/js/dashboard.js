$.get("/api/userinfo", function(req) {
  console.log(req);
  if (req.role == "admin" || req.role == "sales") {
    $("#tableOptions").append("<button id='mySales' class='btn btn-primary'>My Sales</button>");
  }
  if (req.role == "admin" || req.role == "receipts") {
    $("#tableOptions").append("<button id='myReceipts' class='btn btn-primary'>My Receipts</button>");
  }
  if (req.role == "admin") {
    $("#tableOptions").append("<button id='allTransactions' class='btn btn-primary'>All Transactions</button>");
  }
  $("#mySales").on("click", mySales);
  $("#myReceipts").on("click", myReceipts);
  $("#allTransactions").on("click", allTransactions);
});
currentInventory();

//All Transactions Header
function displayallTransHeader() {
  $.get("/api/ingredients", function(req) {
  $.get("/api/userinfo", function(user) {
    $("#tableSubHead").append("<h3>View By Ingredient: </h3>");
    for (var i = 0; i < req.length; i++) {
      var ingredient = $("<span>");
      ingredient.attr("id", "ingredient-" + i);
      $("#tableSubHead").append(ingredient);
      $("#ingredient-" + i).append("<span class='viewIngredient' data-id='" + req[i].id + "' data-name='" + req[i].ingredient + "'>" + req[i].ingredient + ", </span>");
    }

      $(".viewIngredient").on("click", function() {
        var selectedIngredient = $(this).attr("data-name");
        $("#dashboardDisplay").empty();
        $("#tableTitle").html("<h2>All Transactions: " + selectedIngredient + "</h2>")
        var tableRowHead = $("<tr>");
        // transaction Id column head
        var transactionIdHead = $("<th>");
        transactionIdHead.addClass("tableRowHeadStyle");
        transactionIdHead.text("ID");
        tableRowHead.append(transactionIdHead);
          // Entered By  column head
        var userHead = $("<th>");
        userHead.addClass("tableRowHeadStyle");
        userHead.text("Entered By");
        tableRowHead.append(userHead);
        // transaction type column head
        var typeHead = $("<th>");
        typeHead.addClass("tableRowHeadStyle");
        typeHead.text("Type");
        tableRowHead.append(typeHead);
        // ingredient column head
        var ingredientHead = $("<th>");
        ingredientHead.addClass("tableRowHeadStyle");
        ingredientHead.text("Ingredient");
        tableRowHead.append(ingredientHead);
        // start amount column head
        var startHead = $("<th>");
        startHead.addClass("tableRowHeadStyle");
        startHead.text("Start Amount");
        tableRowHead.append(startHead);
        // change amount column head
        var changeHead = $("<th>");
        changeHead.addClass("tableRowHeadStyle");
        changeHead.text("Amount Changed");
        tableRowHead.append(changeHead);
        // end amount column head
        var endHead = $("<th>");
        endHead.addClass("tableRowHeadStyle");
        endHead.text("End Amount");
        tableRowHead.append(endHead);

        //Display Ingredient Table
      $.get("/api/userinfo", function(req) {
      $.get("/api/transaction", function(request) {

        console.log(request);
        for (var i = 0; i < request.length; i++) {
          if(request[i].ingredient == selectedIngredient) {
          var tableRow = $("<tr>");
          //add transaction ID column
          var transactionId = $("<td>");
          transactionId.addClass("tableRowStyle");
          transactionId.text(request[i].transaction_id);
          tableRow.append(transactionId);
          // Entered By
          var type = $("<td>");
          type.addClass("tableRowStyle");
          type.text(request[i].User.first_name + " " + request[i].User.last_name);
          tableRow.append(type);
          // Transaction Type
          var type = $("<td>");
          type.addClass("tableRowStyle");
          type.text(request[i].transaction_type);
          tableRow.append(type);
          // Ingredient Type
          var ingredient = $("<td>");
          ingredient.addClass("tableRowStyle");
          ingredient.text(request[i].ingredient);
          tableRow.append(ingredient);

            //Start Amount
          var start = $("<td>");
          start.addClass("tableRowStyle");
          start.text(request[i].start_amount);
          tableRow.append(start);


           //Changed Amount
          var changed = $("<td>");
          changed.addClass("tableRowStyle");
          changed.text(request[i].amount_changed);
          tableRow.append(changed);

           //End Amount
          var end = $("<td>");
          end.addClass("tableRowStyle");
          end.text(request[i].end_amount);
          tableRow.append(end);

          $("#dashboardDisplay").prepend(tableRow);
          $("#dashboardDisplay").prepend(tableRowHead);
          // focus on table display
          // document.location.href = "#dashboardDisplay";
        }
        }
      });
      });


      }); //End Ingredient Select Button for transactions
});
});
} // end all Transaction Header

//Display All Transactions Table:
function allTransactions() {
  $("#dashboardDisplay").empty();
  $("#tableSubHead").empty();
  $("#tableTitle").html("<h2>All Transactions</h2>")
  //header function
  displayallTransHeader();
  var tableRowHead = $("<tr>");
  // transaction Id column head
  var transactionIdHead = $("<th>");
  transactionIdHead.addClass("tableRowHeadStyle");
  transactionIdHead.text("ID");
  tableRowHead.append(transactionIdHead);
    // Entered By  column head
  var userHead = $("<th>");
  userHead.addClass("tableRowHeadStyle");
  userHead.text("Entered By");
  tableRowHead.append(userHead);
  // transaction type column head
  var typeHead = $("<th>");
  typeHead.addClass("tableRowHeadStyle");
  typeHead.text("Type");
  tableRowHead.append(typeHead);
  // ingredient column head
  var ingredientHead = $("<th>");
  ingredientHead.addClass("tableRowHeadStyle");
  ingredientHead.text("Ingredient");
  tableRowHead.append(ingredientHead);
  // start amount column head
  var startHead = $("<th>");
  startHead.addClass("tableRowHeadStyle");
  startHead.text("Start Amount");
  tableRowHead.append(startHead);
  // change amount column head
  var changeHead = $("<th>");
  changeHead.addClass("tableRowHeadStyle");
  changeHead.text("Amount Changed");
  tableRowHead.append(changeHead);
  // end amount column head
  var endHead = $("<th>");
  endHead.addClass("tableRowHeadStyle");
  endHead.text("End Amount");
  tableRowHead.append(endHead);

  //Display Ingredient Table
$.get("/api/userinfo", function(req) {
$.get("/api/transaction", function(request) {

  console.log(request);
  for (var i = 0; i < request.length; i++) {
    var tableRow = $("<tr>");
    //add transaction ID column
    var transactionId = $("<td>");
    transactionId.addClass("tableRowStyle");
    transactionId.text(request[i].transaction_id);
    tableRow.append(transactionId);
    // Entered By
    var type = $("<td>");
    type.addClass("tableRowStyle");
    type.text(request[i].User.first_name + " " + request[i].User.last_name);
    tableRow.append(type);
    // Transaction Type
    var type = $("<td>");
    type.addClass("tableRowStyle");
    type.text(request[i].transaction_type);
    tableRow.append(type);
    // Ingredient Type
    var ingredient = $("<td>");
    ingredient.addClass("tableRowStyle");
    ingredient.text(request[i].ingredient);
    tableRow.append(ingredient);

      //Start Amount
    var start = $("<td>");
    start.addClass("tableRowStyle");
    start.text(request[i].start_amount);
    tableRow.append(start);


     //Changed Amount
    var changed = $("<td>");
    changed.addClass("tableRowStyle");
    changed.text(request[i].amount_changed);
    tableRow.append(changed);

     //End Amount
    var end = $("<td>");
    end.addClass("tableRowStyle");
    end.text(request[i].end_amount);
    tableRow.append(end);

    $("#dashboardDisplay").prepend(tableRow);
    $("#dashboardDisplay").prepend(tableRowHead);
    // focus on table display
    // document.location.href = "#dashboardDisplay";
  }
});
});
} //End All Transactions




//Display My Receipt Transactions Table:
function myReceipts() {
  $("#dashboardDisplay").empty();
  $("#tableSubHead").empty();
  $("#tableTitle").html("<h2>My Receipt Transactions</h2>")
  var tableRowHead = $("<tr>");
  // transaction Id column head
  var transactionIdHead = $("<th>");
  transactionIdHead.addClass("tableRowHeadStyle");
  transactionIdHead.text("ID");
  tableRowHead.append(transactionIdHead);
  // ingredient type column head
  var itemHead = $("<th>");
  itemHead.addClass("tableRowHeadStyle");
  itemHead.text("Ingredient");
  tableRowHead.append(itemHead);
  // Amount column head
  var amountHead = $("<th>");
  amountHead.addClass("tableRowHeadStyle");
  amountHead.text("Amount(lbs)");
  tableRowHead.append(amountHead);
  // Vendor column head
  var vendorHead = $("<th>");
  vendorHead.addClass("tableRowHeadStyle");
  vendorHead.text("Vendor");
  tableRowHead.append(vendorHead);


  $("#dashboardDisplay").append(tableRowHead);

  //Display My Sales Table Body
$.get("/api/userinfo", function(req) {
$.get("/api/receipt", function(request) {

  console.log(request);
  for (var i = 0; i < request.length; i++) {
    if (req.id == request[i].UserId) {
    var tableRow = $("<tr>");
    //add transaction ID column
    var transactionId = $("<td>");
    transactionId.addClass("tableRowStyle");
    transactionId.text(request[i].receipt_id);
    tableRow.append(transactionId);
    // Ingredient Received
    var item = $("<td>");
    item.addClass("tableRowStyle");
    item.text(request[i].ingredient);
    tableRow.append(item);
    // Amount of Ingredients Received
    var amount = $("<td>");
    amount.addClass("tableRowStyle");
    amount.text(request[i].quantity);
    tableRow.append(amount);

      //Vendor
    var vendor = $("<td>");
    vendor.addClass("tableRowStyle");
    vendor.text(request[i].VendorMaster.vendorname);
    tableRow.append(vendor);

    $("#dashboardDisplay").append(tableRow);
    // focus on table display
    // document.location.href = "#dashboardDisplay";
  }
  }
});
});
} //End My Receipts






//Display My Sales Transactions Table:
function mySales() {
  $("#dashboardDisplay").empty();
  $("#tableSubHead").empty();
  $("#tableTitle").html("<h2>My Sales Transactions</h2>")
  var tableRowHead = $("<tr>");
  // transaction Id column head
  var transactionIdHead = $("<th>");
  transactionIdHead.addClass("tableRowHeadStyle");
  transactionIdHead.text("ID");
  tableRowHead.append(transactionIdHead);
  // item sold type column head
  var itemHead = $("<th>");
  itemHead.addClass("tableRowHeadStyle");
  itemHead.text("Beer");
  tableRowHead.append(itemHead);
  // pints sold column head
  var pintsHead = $("<th>");
  pintsHead.addClass("tableRowHeadStyle");
  pintsHead.text("Pints");
  tableRowHead.append(pintsHead);
  // First ingredient column head
  var firstIngredientHead = $("<th>");
  firstIngredientHead.addClass("tableRowHeadStyle");
  firstIngredientHead.text("Type");
  tableRowHead.append(firstIngredientHead);

  // Change amount column head
  var changeOneHead = $("<th>");
  changeOneHead.addClass("tableRowHeadStyle");
  changeOneHead.text("Amt");
  tableRowHead.append(changeOneHead);

    // Second ingredient  column head
  var secondIngredientHead = $("<th>");
  secondIngredientHead.addClass("tableRowHeadStyle");
  secondIngredientHead.text("Ingr.");
  tableRowHead.append(secondIngredientHead);

  // change amount column head
  var changeTwoHead = $("<th>");
  changeTwoHead.addClass("tableRowHeadStyle");
  changeTwoHead.text("Amt");
  tableRowHead.append(changeTwoHead);

      // Third ingredient  column head
  var thirdIngredientHead = $("<th>");
  thirdIngredientHead.addClass("tableRowHeadStyle");
  thirdIngredientHead.text("Ingr.");
  tableRowHead.append(thirdIngredientHead);

  // change amount column head
  var changeThreeHead = $("<th>");
  changeThreeHead.addClass("tableRowHeadStyle");
  changeThreeHead.text("Amt");
  tableRowHead.append(changeThreeHead);

      // Fourth ingredient  column head
  var fourthIngredientHead = $("<th>");
  fourthIngredientHead.addClass("tableRowHeadStyle");
  fourthIngredientHead.text("Ingr.");
  tableRowHead.append(fourthIngredientHead);

  // change amount column head
  var changeFourHead = $("<th>");
  changeFourHead.addClass("tableRowHeadStyle");
  changeFourHead.text("Amt");
  tableRowHead.append(changeFourHead);

      // Five ingredient  column head
  var fifthIngredientHead = $("<th>");
  fifthIngredientHead.addClass("tableRowHeadStyle");
  fifthIngredientHead.text("Ingr.");
  tableRowHead.append(fifthIngredientHead);

  // change amount column head
  var changeFiveHead = $("<th>");
  changeFiveHead.addClass("tableRowHeadStyle");
  changeFiveHead.text("Amt");
  tableRowHead.append(changeFiveHead);

      // Sixth ingredient  column head
  var sixthIngredientHead = $("<th>");
  sixthIngredientHead.addClass("tableRowHeadStyle");
  sixthIngredientHead.text("Ingr.");
  tableRowHead.append(sixthIngredientHead);
  // change amount column head
  var changeSixHead = $("<th>");
  changeSixHead.addClass("tableRowHeadStyle");
  changeSixHead.text("Amt");
  tableRowHead.append(changeSixHead);


  $("#dashboardDisplay").append(tableRowHead);

  //Display My Sales Table Body
$.get("/api/userinfo", function(req) {
$.get("/api/sales", function(request) {

  console.log(request);
  for (var i = 0; i < request.length; i++) {
    if (req.id == request[i].UserId) {
    var tableRow = $("<tr>");
    //add transaction ID column
    var transactionId = $("<td>");
    transactionId.addClass("tableRowStyle");
    transactionId.text(request[i].sale_id);
    tableRow.append(transactionId);
    // Beer Sold
    var item = $("<td>");
    item.addClass("tableRowStyle");
    item.text(request[i].item_sold);
    tableRow.append(item);
    // Amount of Pints Sold
    var pints = $("<td>");
    pints.addClass("tableRowStyle");
    pints.text(request[i].total_sales_units);
    tableRow.append(pints);

      //First Ingredient
    var ingredientOne = $("<td>");
    ingredientOne.addClass("tableRowStyle");
    ingredientOne.text(request[i].ingredient_one);
    tableRow.append(ingredientOne);


     //Changed Amount
    var oneSoldAmt = $("<td>");
    oneSoldAmt.addClass("tableRowStyle");
    oneSoldAmt.text(Math.round(request[i].amount_one_deducted * 100)/100);
    tableRow.append(oneSoldAmt);

  if(request[i].ingredient_two != null) {
      //Second Ingredient
    var ingredientTwo = $("<td>");
    ingredientTwo.addClass("tableRowStyle");
    ingredientTwo.text(request[i].ingredient_two);
    tableRow.append(ingredientTwo);
  } else {
    var ingredientTwo = $("<td>");
    ingredientTwo.addClass("tableRowStyle");
    ingredientTwo.text("");
    tableRow.append(ingredientTwo);
  }

  if(request[i].ingredient_two != null) {
     //Changed Amount
    var twoSoldAmt = $("<td>");
    twoSoldAmt.addClass("tableRowStyle");
    twoSoldAmt.text(Math.round(request[i].amount_two_deducted * 100)/100);
    tableRow.append(twoSoldAmt);
  } else {
    var twoSoldAmt = $("<td>");
    twoSoldAmt.addClass("tableRowStyle");
    twoSoldAmt.text("");
    tableRow.append(twoSoldAmt);
  }

    if(request[i].ingredient_three != null) {
      //Third Ingredient
    var ingredientThree = $("<td>");
    ingredientThree.addClass("tableRowStyle");
    ingredientThree.text(request[i].ingredient_three);
    tableRow.append(ingredientThree);
  } else {
    var ingredientThree = $("<td>");
    ingredientThree.addClass("tableRowStyle");
    ingredientThree.text("");
    tableRow.append(ingredientThree);
  }

  if(request[i].ingredient_three != null) {
     //Changed Amount
    var threeSoldAmt = $("<td>");
    threeSoldAmt.addClass("tableRowStyle");
    threeSoldAmt.text(Math.round(request[i].amount_three_deducted * 100)/100);
    tableRow.append(threeSoldAmt);
  } else {
    var threeSoldAmt = $("<td>");
    threeSoldAmt.addClass("tableRowStyle");
    threeSoldAmt.text("");
    tableRow.append(threeSoldAmt);
  }

    if(request[i].ingredient_four != null) {
      //Fourth Ingredient
    var ingredientFour = $("<td>");
    ingredientFour.addClass("tableRowStyle");
    ingredientFour.text(request[i].ingredient_four);
    tableRow.append(ingredientFour);
  } else {
    var ingredientFour = $("<td>");
    ingredientFour.addClass("tableRowStyle");
    ingredientFour.text("");
    tableRow.append(ingredientFour);
  }

  if(request[i].ingredient_four != null) {
     //Changed Amount
    var fourSoldAmt = $("<td>");
    fourSoldAmt.addClass("tableRowStyle");
    fourSoldAmt.text(Math.round(request[i].amount_four_deducted * 100)/100);
    tableRow.append(fourSoldAmt);
  } else {
    var fourSoldAmt = $("<td>");
    fourSoldAmt.addClass("tableRowStyle");
    fourSoldAmt.text("");
    tableRow.append(fourSoldAmt);
  }

    if(request[i].ingredient_five != null) {
      //Fifth Ingredient
    var ingredientFive = $("<td>");
    ingredientFive.addClass("tableRowStyle");
    ingredientFive.text(request[i].ingredient_five);
    tableRow.append(ingredientFive);
  } else {
    var ingredientFive = $("<td>");
    ingredientFive.addClass("tableRowStyle");
    ingredientFive.text("");
    tableRow.append(ingredientFive);
  }

  if(request[i].ingredient_five != null) {
     //Changed Amount
    var fiveSoldAmt = $("<td>");
    fiveSoldAmt.addClass("tableRowStyle");
    fiveSoldAmt.text(Math.round(request[i].amount_five_deducted * 100)/100);
    tableRow.append(fiveSoldAmt);
  } else {
    var fiveSoldAmt = $("<td>");
    fiveSoldAmt.addClass("tableRowStyle");
    fiveSoldAmt.text("");
    tableRow.append(fiveSoldAmt);
  }

    if(request[i].ingredient_six != null) {
      //Sixth Ingredient
    var ingredientSix = $("<td>");
    ingredientSix.addClass("tableRowStyle");
    ingredientSix.text(request[i].ingredient_six);
    tableRow.append(ingredientSix);
  } else {
    var ingredientSix = $("<td>");
    ingredientSix.addClass("tableRowStyle");
    ingredientSix.text("");
    tableRow.append(ingredientSix);
  }

  if(request[i].ingredient_six != null) {
     //Changed Amount
    var sixSoldAmt = $("<td>");
    sixSoldAmt.addClass("tableRowStyle");
    sixSoldAmt.text(Math.round(request[i].amount_six_deducted * 100)/100);
    tableRow.append(sixSoldAmt);
  } else {
    var sixSoldAmt = $("<td>");
    sixSoldAmt.addClass("tableRowStyle");
    sixSoldAmt.text("");
    tableRow.append(sixSoldAmt);
  }


    $("#dashboardDisplay").append(tableRow);
    // focus on table display
    // document.location.href = "#dashboardDisplay";
  }
  }
});
});
} //End My Sales



$("#myTransactions").on("click", myTransactions);

//Display My Transactions Table:
function myTransactions() {
  $("#dashboardDisplay").empty();
  $("#tableSubHead").empty();
  $("#tableTitle").html("<h2>My Transactions</h2>")
  var tableRowHead = $("<tr>");
  // transaction Id column head
  var transactionIdHead = $("<th>");
  transactionIdHead.addClass("tableRowHeadStyle");
  transactionIdHead.text("Transaction ID");
  tableRowHead.append(transactionIdHead);
  // transaction type column head
  var typeHead = $("<th>");
  typeHead.addClass("tableRowHeadStyle");
  typeHead.text("Transaction Type");
  tableRowHead.append(typeHead);
  // ingredient column head
  var ingredientHead = $("<th>");
  ingredientHead.addClass("tableRowHeadStyle");
  ingredientHead.text("Ingredient");
  tableRowHead.append(ingredientHead);
  // start amount column head
  var startHead = $("<th>");
  startHead.addClass("tableRowHeadStyle");
  startHead.text("Start Amount");
  tableRowHead.append(startHead);
  // change amount column head
  var changeHead = $("<th>");
  changeHead.addClass("tableRowHeadStyle");
  changeHead.text("Amount Changed");
  tableRowHead.append(changeHead);
  // end amount column head
  var endHead = $("<th>");
  endHead.addClass("tableRowHeadStyle");
  endHead.text("End Amount");
  tableRowHead.append(endHead);

  //Display Ingredient Table
$.get("/api/userinfo", function(req) {
$.get("/api/transaction", function(request) {

  console.log(request);
  for (var i = 0; i < request.length; i++) {
    if (req.id == request[i].UserId) {
    var tableRow = $("<tr>");
    //add transaction ID column
    var transactionId = $("<td>");
    transactionId.addClass("tableRowStyle");
    transactionId.text(request[i].transaction_id);
    tableRow.append(transactionId);
    // Transaction Type
    var type = $("<td>");
    type.addClass("tableRowStyle");
    type.text(request[i].transaction_type);
    tableRow.append(type);
    // Ingredient Type
    var ingredient = $("<td>");
    ingredient.addClass("tableRowStyle");
    ingredient.text(request[i].ingredient);
    tableRow.append(ingredient);

      //Start Amount
    var start = $("<td>");
    start.addClass("tableRowStyle");
    start.text(request[i].start_amount);
    tableRow.append(start);


     //Changed Amount
    var changed = $("<td>");
    changed.addClass("tableRowStyle");
    changed.text(request[i].amount_changed);
    tableRow.append(changed);

     //End Amount
    var end = $("<td>");
    end.addClass("tableRowStyle");
    end.text(request[i].end_amount);
    tableRow.append(end);

    $("#dashboardDisplay").prepend(tableRow);
    $("#dashboardDisplay").prepend(tableRowHead);
    // focus on table display
    // document.location.href = "#dashboardDisplay";
  }
  }
});
});
} //End My Transactions


//Display Current Inventory Table
$("#currentInventoryBtn").on("click", currentInventory);


function currentInventory() {
  $("#dashboardDisplay").empty();
  $("#tableSubHead").empty();
  $("#tableTitle").html("<h2>Current Inventory</h2>")
  var tableRowHead = $("<tr>");
  // ingredient column head
  var ingredientHead = $("<th>");
  ingredientHead.addClass("tableRowHeadStyle");
  ingredientHead.text("Ingredient");
  tableRowHead.append(ingredientHead);
  // quantity column head
  var quantityHead = $("<th>");
  quantityHead.addClass("tableRowHeadStyle");
  quantityHead.text("Current Quantity(lbs)");
  tableRowHead.append(quantityHead);
  // ingredient column head
  var firstWarningHead = $("<th>");
  firstWarningHead.addClass("tableRowHeadStyle");
  firstWarningHead.text("Below 250");
  tableRowHead.append(firstWarningHead);

  // secondWarning column head
  var secondWarningHead = $("<th>");
  secondWarningHead.addClass("tableRowHeadStyle");
  secondWarningHead.text("Below 100");
  tableRowHead.append(secondWarningHead);

  // thirdWarning column head
  var thirdWarningHead = $("<th>");
  thirdWarningHead.addClass("tableRowHeadStyle");
  thirdWarningHead.text("Below Zero");
  tableRowHead.append(thirdWarningHead);

  $("#dashboardDisplay").append(tableRowHead);

  //Display Ingredient Table
$.get("/api/ingredients", function(request) {
  console.log(request);
  for (var i = 0; i < request.length; i++) {
    var tableRow = $("<tr>");
    //add ingredient column
    var ingredient = $("<td>");
    ingredient.addClass("tableRowStyle");
    ingredient.text(request[i].ingredient);
    tableRow.append(ingredient);

    // quantity column

    var quantity = $("<td>");
    quantity.addClass("tableRowStyle");
    quantity.text(request[i].quantity);
    tableRow.append(quantity);

      //Below First Warning Column
    var warningLevel = $("<td>");
    warningLevel.addClass("tableRowStyle");
    if (request[i].quantity < 250) {
      warningLevel.addClass("warningLevel");
      warningLevel.text("Yes");
      tableRow.append(warningLevel);
    } else{
      warningLevel.text("No");
      tableRow.append(warningLevel);
    }

    //Below  Second Warning column
    var dangerLevel = $("<td>");
    dangerLevel.addClass("tableRowStyle");
    if (request[i].quantity < 100) {
      dangerLevel.addClass("dangerLevel");
      dangerLevel.text("Yes");
      tableRow.append(dangerLevel);
    } else{
      dangerLevel.text("No");
      tableRow.append(dangerLevel);
    }

    //Below Zero Column
    var belowZero = $("<td>");
    belowZero.addClass("tableRowStyle");
    if (request[i].quantity < 0) {
      belowZero.addClass("belowZero");
      belowZero.text("Yes");
      tableRow.append(belowZero);
    } else{
      belowZero.text("No");
      tableRow.append(belowZero);
    }

    $("#dashboardDisplay").append(tableRow);
    // focus on table display
    // document.location.href = "#dashboardDisplay";

  }
});
}



//Display Future Table
$("#futureInventoryBtn").on("click", futureInventory);

function displayFutureHeader() {
  $.get("/api/recipe", function(req) {
  $.get("/api/userinfo", function(user) {
    $("#tableSubHead").append("<h3>Current Projected Weekly Sales: </h3>");
    for (var i = 0; i < req.length; i++) {
      var recipe = $("<span>");
      recipe.attr("id", "recipeSales-" + i);
      $("#tableSubHead").append(recipe);
      $("#recipeSales-" + i).append("<span class='updateSale' data-id='" + req[i].id + "' data-sales='" + req[i].projected_sales + "' data-item='" + req[i].item + "'>" + req[i].item + ": " + req[i].projected_sales + ", </span>");
    }

    if(user.role == "admin") {
      $(".updateSale").on("click", function() {
        $("#tableSubHead").empty();
        var updateDisplay = $("<div>");
        updateDisplay.addClass("well");
        updateDisplay.attr("id", "updateSalesWell");
        var selectedItem = {
          "projectedSale": $(this).attr("data-sales"),
          "item": $(this).attr("data-item"),
          "id": $(this).attr("data-id")
        };

        $("#tableSubHead").append(updateDisplay);
        $("#updateSalesWell").append("<h3>Update Weekly Projected Sales for " + selectedItem.item +
                                    " (currently: " + selectedItem.projectedSale + ")</h3>" +
                                    "<div class='form-group'> <label>New Weekly Sales Amount (pints):  </label> <input type='text' size='3' id='newSalesAmt'></div>" +
                                    "<button id='submitUpdate' class='btn btn-primary'>Update</button><button id='cancelSaleUpdate' class='btn btn-warning'>Back</button>");

        $("#submitUpdate").on("click", function() {
          var updateSalesInfo = {
            id: selectedItem.id,
            projected_sales: $("#newSalesAmt").val().trim()
          };
          updateFutureRecipe(updateSalesInfo);
        });

        $("#cancelSaleUpdate").on("click", futureInventory);

      });
    }
});
});
}


function futureInventory() {
  $("#tableSubHead").empty();
  $("#dashboardDisplay").empty();
  $("#tableTitle").html("<h2>Future Inventory</h2>")

  //call function for header options
  displayFutureHeader();
  var tableRowHead = $("<tr>");
  // ingredient column head
  var ingredientHead = $("<th>");
  ingredientHead.addClass("tableRowHeadStyle");
  ingredientHead.text("Ingredient");
  tableRowHead.append(ingredientHead);
  // quantity column head
  var quantityHead = $("<th>");
  quantityHead.addClass("tableRowHeadStyle");
  quantityHead.text("Current Quantity(lbs)");
  tableRowHead.append(quantityHead);

  // first week out column head
  var firstWeekOutHead = $("<th>");
  firstWeekOutHead.addClass("tableRowHeadStyle");
  firstWeekOutHead.text("1 Week");
  tableRowHead.append(firstWeekOutHead);

  // secon week out column head
  var secondWeekOutHead = $("<th>");
  secondWeekOutHead.addClass("tableRowHeadStyle");
  secondWeekOutHead.text("2 Weeks");
  tableRowHead.append(secondWeekOutHead);

  // third week out column head
  var thirdWeekOutHead = $("<th>");
  thirdWeekOutHead.addClass("tableRowHeadStyle");
  thirdWeekOutHead.text("3 Weeks");
  tableRowHead.append(thirdWeekOutHead);

  // Month out column head
  var monthOutHead = $("<th>");
  monthOutHead.addClass("tableRowHeadStyle");
  monthOutHead.text("Month");
  tableRowHead.append(monthOutHead);

  $("#dashboardDisplay").append(tableRowHead);

  //Display Body of Future Ingredient table
$.get("/api/ingredients", function(request) {
  $.get("/api/recipe", function(recipe) {
  console.log(request);
  console.log(recipe);
  for (var i = 0; i < request.length; i++) {
    var tableRow = $("<tr>");
    //add ingredient column
    var ingredient = $("<td>");
    ingredient.addClass("tableRowStyle");
    ingredient.text(request[i].ingredient);
    tableRow.append(ingredient);

    // quantity column

    var quantity = $("<td>");
    quantity.addClass("tableRowStyle");
    quantity.text(request[i].quantity);
    tableRow.append(quantity);

       //First week Column
    var firstWeek = $("<td>");
    var totalOneDeduct = 0;
    firstWeek.addClass("tableRowStyle");

    for (var j = 0; j < recipe.length; j++) {
      if (request[i].ingredient == recipe[j].ingredient_one) {
        var amountOneSold = (recipe[j].quantity_one / 165) * recipe[j].projected_sales;
        totalOneDeduct += amountOneSold;

      }
      //ingredient two
      if (request[i].ingredient == recipe[j].ingredient_two) {
        var amountTwoSold = (recipe[j].quantity_two / 165) * recipe[j].projected_sales;
        totalOneDeduct += amountTwoSold;
      }
      //ingredient three
      if (request[i].ingredient == recipe[j].ingredient_three) {
        var amountThreeSold = (recipe[j].quantity_three / 165) * recipe[j].projected_sales;
        totalOneDeduct += amountThreeSold;
      }

      //fourth ingredient
      if (request[i].ingredient == recipe[j].ingredient_four) {
        var amountFourSold = (recipe[j].quantity_four / 165) * recipe[j].projected_sales;
        totalOneDeduct += amountFourSold;
      }

      //Fifth ingredient
      if (request[i].ingredient == recipe[j].ingredient_five) {
        var amountFiveSold = (recipe[j].quantity_five / 165) * recipe[j].projected_sales;
       totalOneDeduct += amountFiveSold;
      }


      //Sixth Ingredient
      if (request[i].ingredient == recipe[j].ingredient_six) {
        var amountSixSold = (recipe[j].quantity_five / 165) * recipe[j].projected_sales;
        totalOneDeduct += amountSixSold;
      }

    }
    var oneAmount = request[i].quantity - totalOneDeduct;
    var displayAmount = Math.round(oneAmount *100)/100;
    if(displayAmount < 0) {
    firstWeek.addClass("belowZero");
    firstWeek.text(displayAmount);
    tableRow.append(firstWeek);
  } else if (displayAmount < 100) {
    firstWeek.addClass("dangerLevel");
    firstWeek.text(displayAmount);
    tableRow.append(firstWeek);
  } else if (displayAmount < 250) {
    firstWeek.addClass("warningLevel");
    firstWeek.text(displayAmount);
    tableRow.append(firstWeek);
  } else {
    firstWeek.text(displayAmount);
    tableRow.append(firstWeek);
  }


  //Second Week Column

   var secondWeek = $("<td>");
    var totalTwoDeduct = 0;
    secondWeek.addClass("tableRowStyle");

    for (var j = 0; j < recipe.length; j++) {
      if (request[i].ingredient == recipe[j].ingredient_one) {
        var amountOneSold = (recipe[j].quantity_one / 165) * (recipe[j].projected_sales * 2);
        totalTwoDeduct += amountOneSold;

      }
      //ingredient two
      if (request[i].ingredient == recipe[j].ingredient_two) {
        var amountTwoSold = (recipe[j].quantity_two / 165) * (recipe[j].projected_sales * 2);
        totalTwoDeduct += amountTwoSold;
      }
      //ingredient three
      if (request[i].ingredient == recipe[j].ingredient_three) {
        var amountThreeSold = (recipe[j].quantity_three / 165) * (recipe[j].projected_sales * 2);
        totalTwoDeduct += amountThreeSold;
      }

      //fourth ingredient
      if (request[i].ingredient == recipe[j].ingredient_four) {
        var amountFourSold = (recipe[j].quantity_four / 165) * (recipe[j].projected_sales * 2);
        totalTwoDeduct += amountFourSold;
      }

      //Fifth ingredient
      if (request[i].ingredient == recipe[j].ingredient_five) {
        var amountFiveSold = (recipe[j].quantity_five / 165) * (recipe[j].projected_sales * 2);
       totalTwoDeduct += amountFiveSold;
      }


      //Sixth Ingredient
      if (request[i].ingredient == recipe[j].ingredient_six) {
        var amountSixSold = (recipe[j].quantity_five / 165) * (recipe[j].projected_sales * 2);
        totalTwoDeduct += amountSixSold;
      }

    }
    var twoAmount = request[i].quantity - totalTwoDeduct;
    var displayTwoAmount = Math.round(twoAmount *100)/100;
    if(displayTwoAmount < 0) {
    secondWeek.addClass("belowZero");
    secondWeek.text(displayTwoAmount);
    tableRow.append(secondWeek);
  } else if (displayTwoAmount < 100) {
    secondWeek.addClass("dangerLevel");
    secondWeek.text(displayTwoAmount);
    tableRow.append(secondWeek);
  } else if (displayTwoAmount < 250) {
    secondWeek.addClass("warningLevel");
    secondWeek.text(displayTwoAmount);
    tableRow.append(secondWeek);
  } else {
    secondWeek.text(displayTwoAmount);
    tableRow.append(secondWeek);
  }

  //third Week Column

   var thirdWeek = $("<td>");
    var totalThreeDeduct = 0;
    thirdWeek.addClass("tableRowStyle");

    for (var j = 0; j < recipe.length; j++) {
      if (request[i].ingredient == recipe[j].ingredient_one) {
        var amountOneSold = (recipe[j].quantity_one / 165) * (recipe[j].projected_sales * 3);
        totalThreeDeduct += amountOneSold;

      }
      //ingredient two
      if (request[i].ingredient == recipe[j].ingredient_two) {
        var amountTwoSold = (recipe[j].quantity_two / 165) * (recipe[j].projected_sales * 3);
        totalThreeDeduct += amountTwoSold;
      }
      //ingredient three
      if (request[i].ingredient == recipe[j].ingredient_three) {
        var amountThreeSold = (recipe[j].quantity_three / 165) * (recipe[j].projected_sales * 3);
        totalThreeDeduct += amountThreeSold;
      }

      //fourth ingredient
      if (request[i].ingredient == recipe[j].ingredient_four) {
        var amountFourSold = (recipe[j].quantity_four / 165) * (recipe[j].projected_sales * 3);
        totalThreeDeduct += amountFourSold;
      }

      //Fifth ingredient
      if (request[i].ingredient == recipe[j].ingredient_five) {
        var amountFiveSold = (recipe[j].quantity_five / 165) * (recipe[j].projected_sales * 3);
       totalThreeDeduct += amountFiveSold;
      }


      //Sixth Ingredient
      if (request[i].ingredient == recipe[j].ingredient_six) {
        var amountSixSold = (recipe[j].quantity_five / 165) * (recipe[j].projected_sales * 3);
        totalThreeDeduct += amountSixSold;
      }

    }
    var threeAmount = request[i].quantity - totalThreeDeduct;
    var displayThreeAmount = Math.round(threeAmount *100)/100;
    if(displayThreeAmount < 0) {
    thirdWeek.addClass("belowZero");
    thirdWeek.text(displayThreeAmount);
    tableRow.append(thirdWeek);
  } else if (displayThreeAmount < 100) {
    thirdWeek.addClass("dangerLevel");
    thirdWeek.text(displayThreeAmount);
    tableRow.append(thirdWeek);
  } else if (displayThreeAmount < 250) {
    thirdWeek.addClass("warningLevel");
    thirdWeek.text(displayThreeAmount);
    tableRow.append(thirdWeek);
  } else {
    thirdWeek.text(displayThreeAmount);
    tableRow.append(thirdWeek);
  }


  //Month Column

   var month = $("<td>");
    var totalMonthDeduct = 0;
    month.addClass("tableRowStyle");

    for (var j = 0; j < recipe.length; j++) {
      if (request[i].ingredient == recipe[j].ingredient_one) {
        var amountOneSold = (recipe[j].quantity_one / 165) * (recipe[j].projected_sales * 4);
        totalMonthDeduct += amountOneSold;

      }
      //ingredient two
      if (request[i].ingredient == recipe[j].ingredient_two) {
        var amountTwoSold = (recipe[j].quantity_two / 165) * (recipe[j].projected_sales * 4);
        totalMonthDeduct += amountTwoSold;
      }
      //ingredient three
      if (request[i].ingredient == recipe[j].ingredient_three) {
        var amountThreeSold = (recipe[j].quantity_three / 165) * (recipe[j].projected_sales * 4);
        totalMonthDeduct += amountThreeSold;
      }

      //fourth ingredient
      if (request[i].ingredient == recipe[j].ingredient_four) {
        var amountFourSold = (recipe[j].quantity_four / 165) * (recipe[j].projected_sales * 4);
        totalMonthDeduct += amountFourSold;
      }

      //Fifth ingredient
      if (request[i].ingredient == recipe[j].ingredient_five) {
        var amountFiveSold = (recipe[j].quantity_five / 165) * (recipe[j].projected_sales * 4);
       totalMonthDeduct += amountFiveSold;
      }


      //Sixth Ingredient
      if (request[i].ingredient == recipe[j].ingredient_six) {
        var amountSixSold = (recipe[j].quantity_five / 165) * (recipe[j].projected_sales * 4);
        totalMonthDeduct += amountSixSold;
      }

    }
    var monthAmount = request[i].quantity - totalMonthDeduct;
    var displayMonthAmount = Math.round(monthAmount *100)/100;
    if(displayMonthAmount < 0) {
    month.addClass("belowZero");
    month.text(displayMonthAmount);
    tableRow.append(month);
  } else if (displayMonthAmount < 100) {
    month.addClass("dangerLevel");
    month.text(displayMonthAmount);
    tableRow.append(month);
  } else if (displayMonthAmount < 250) {
    month.addClass("warningLevel");
    month.text(displayMonthAmount);
    tableRow.append(month);
  } else {
    month.text(displayMonthAmount);
    tableRow.append(month);
  }

    $("#dashboardDisplay").append(tableRow);
    // focus on table display
    // document.location.href = "#dashboardDisplay";

  }
});
});
} //End of Future Inventory Function







function updateFutureRecipe(info) {
    $.ajax({
      method: "PUT",
      url: "/api/recipe",
      data: info
    })
    .done(function() {
        console.log("Yay Success");
        futureInventory();
    });
}