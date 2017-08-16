$.get("/api/userinfo", function(req) {
  console.log(req);
});
currentInventory();

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

  $("#dashboardDisplay").append(tableRowHead);

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

    $("#dashboardDisplay").append(tableRow);
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