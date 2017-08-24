$.get("/api/recipe", function(req) {
    console.log(req);
    for (var i = 0; i < req.length; i++) {
        $("#beerType").append("<option value='" + req[i].item + "'>" + req[i].item + "</option>");
    }
});

$("#submit-sales").on("click", function() {
    $("#salesMessage").empty();
    $.get("/api/userinfo", function(user) {
    var chosenItem = $("#beerType").val().trim();
    var pintsSold = $("#pintsSold").val().trim();
    var transactionId = user.id.toString() + user.transaction_counter.toString();
    var transactionInfo = {
        "transaction_id": transactionId,
        "transaction_type": "Sale",
        "UserId": user.id
    }
    var salesInfo = {
        "item_sold": chosenItem,
        "total_sales_units": pintsSold,
        "UserId": user.id,
        "sale_id": transactionId
    };
    var ingredientOne = {};
    var ingredientTwo = {};
    var ingredientThree = {};
    var ingredientFour = {};
    var ingredientFive = {};
    var ingredientSix = {};
        console.log(user);
    $.get("/api/recipe", function(request) {
        $.get("/api/ingredients", function(data) {
            for (var i = 0; i < request.length; i++) {
                if (request[i].item === chosenItem) {
                    if (request[i].ingredient_one != null) {
                        var ingredientOneAdjust = (request[i].quantity_one / 165) *  pintsSold;
                        console.log(ingredientOneAdjust);
                        for (var j = 0; j < data.length; j++) {
                            if (request[i].ingredient_one == data[j].ingredient) {
                                //update ingredient table info
                                var newIngredientOneAmt = data[j].quantity - ingredientOneAdjust;
                                ingredientOne["id"] = data[j].id;
                                ingredientOne["quantity"] = newIngredientOneAmt;
                                //update sales table info
                                salesInfo["ingredient_one"] = data[j].ingredient;
                                salesInfo["amount_one_start"] = data[j].quantity;
                                salesInfo["amount_one_deducted"] = ingredientOneAdjust;
                                salesInfo["amount_one_end"] = newIngredientOneAmt;
                                //update transaction table info
                                transactionInfo["ingredient"] = data[j].ingredient;
                                transactionInfo["start_amount"] = data[j].quantity;
                                transactionInfo["amount_changed"] = -ingredientOneAdjust;
                                transactionInfo["end_amount"] = newIngredientOneAmt;
                                updateIngredient(ingredientOne);
                                createTransaction(transactionInfo);
                            }
                        }
                    }
                    if (request[i].ingredient_two != null) {
                        var ingredientTwoAdjust = (request[i].quantity_two / 165) *  pintsSold;
                        console.log(ingredientTwoAdjust);
                        for (var j = 0; j < data.length; j++) {
                            if (request[i].ingredient_two == data[j].ingredient) {
                                var newIngredientTwoAmt = data[j].quantity - ingredientTwoAdjust;
                                ingredientTwo["id"] = data[j].id;
                                ingredientTwo["quantity"] = newIngredientTwoAmt;
                                salesInfo["ingredient_two"] = data[j].ingredient;
                                salesInfo["amount_two_start"] = data[j].quantity;
                                salesInfo["amount_two_deducted"] = ingredientTwoAdjust;
                                salesInfo["amount_two_end"] = newIngredientTwoAmt;
                                transactionInfo["ingredient"] = data[j].ingredient;
                                transactionInfo["start_amount"] = data[j].quantity;
                                transactionInfo["amount_changed"] = -ingredientTwoAdjust;
                                transactionInfo["end_amount"] = newIngredientTwoAmt;
                                updateIngredient(ingredientTwo);
                                createTransaction(transactionInfo);
                            }
                        }
                    }
                    if (request[i].ingredient_three != null) {
                        var ingredientThreeAdjust = (request[i].quantity_three / 165) *  pintsSold;
                        console.log(ingredientThreeAdjust);
                        for (var j = 0; j < data.length; j++) {
                            if (request[i].ingredient_three == data[j].ingredient) {
                                var newIngredientThreeAmt = data[j].quantity - ingredientThreeAdjust;
                                ingredientThree["id"] = data[j].id;
                                ingredientThree["quantity"] = newIngredientThreeAmt;
                                salesInfo["ingredient_three"] = data[j].ingredient;
                                salesInfo["amount_three_start"] = data[j].quantity;
                                salesInfo["amount_three_deducted"] = ingredientThreeAdjust;
                                salesInfo["amount_three_end"] = newIngredientThreeAmt;
                                transactionInfo["ingredient"] = data[j].ingredient;
                                transactionInfo["start_amount"] = data[j].quantity;
                                transactionInfo["amount_changed"] = -ingredientThreeAdjust;
                                transactionInfo["end_amount"] = newIngredientThreeAmt;
                                updateIngredient(ingredientThree);
                                createTransaction(transactionInfo);
                            }
                        }
                    }
                    if (request[i].ingredient_four != null) {
                        var ingredientFourAdjust = (request[i].quantity_four / 165) *  pintsSold;
                        console.log(ingredientFourAdjust);
                        for (var j = 0; j < data.length; j++) {
                            if (request[i].ingredient_four == data[j].ingredient) {
                                var newIngredientFourAmt = data[j].quantity - ingredientFourAdjust;
                                ingredientFour["id"] = data[j].id;
                                ingredientFour["quantity"] = newIngredientFourAmt;
                                salesInfo["ingredient_four"] = data[j].ingredient;
                                salesInfo["amount_four_start"] = data[j].quantity;
                                salesInfo["amount_four_deducted"] = ingredientFourAdjust;
                                salesInfo["amount_four_end"] = newIngredientFourAmt;
                                transactionInfo["ingredient"] = data[j].ingredient;
                                transactionInfo["start_amount"] = data[j].quantity;
                                transactionInfo["amount_changed"] = -ingredientFourAdjust;
                                transactionInfo["end_amount"] = newIngredientFourAmt;
                                updateIngredient(ingredientFour);
                                createTransaction(transactionInfo);
                            }
                        }
                    }
                    if (request[i].ingredient_five != null) {
                        var ingredientFiveAdjust = (request[i].quantity_five / 165) *  pintsSold;
                        console.log(ingredientFiveAdjust);
                        for (var j = 0; j < data.length; j++) {
                            if (request[i].ingredient_five == data[j].ingredient) {
                                var newIngredientFiveAmt = data[j].quantity - ingredientFiveAdjust;
                                ingredientFive["id"] = data[j].id;
                                ingredientFive["quantity"] = newIngredientFiveAmt;
                                salesInfo["ingredient_five"] = data[j].ingredient;
                                salesInfo["amount_five_start"] = data[j].quantity;
                                salesInfo["amount_five_deducted"] = ingredientFiveAdjust;
                                salesInfo["amount_five_end"] = newIngredientFiveAmt;
                                transactionInfo["ingredient"] = data[j].ingredient;
                                transactionInfo["start_amount"] = data[j].quantity;
                                transactionInfo["amount_changed"] = -ingredientFiveAdjust;
                                transactionInfo["end_amount"] = newIngredientFiveAmt;
                                updateIngredient(ingredientFive);
                                createTransaction(transactionInfo);
                            }
                        }
                    }
                    if (request[i].ingredient_six != null) {
                        var ingredientSixAdjust = (request[i].quantity_six / 165) *  pintsSold;
                        console.log(ingredientSixAdjust);
                        for (var j = 0; j < data.length; j++) {
                            if (request[i].ingredient_six == data[j].ingredient) {
                                var newIngredientSixAmt = data[j].quantity - ingredientSixAdjust;
                                ingredientSix["id"] = data[j].id;
                                ingredientSix["quantity"] = newIngredientSixAmt;
                                salesInfo["ingredient_six"] = data[j].ingredient;
                                salesInfo["amount_six_start"] = data[j].quantity;
                                salesInfo["amount_six_deducted"] = ingredientSixAdjust;
                                salesInfo["amount_six_end"] = newIngredientSixAmt;
                                transactionInfo["ingredient"] = data[j].ingredient;
                                transactionInfo["start_amount"] = data[j].quantity;
                                transactionInfo["amount_changed"] = -ingredientSixAdjust;
                                transactionInfo["end_amount"] = newIngredientSixAmt;
                                updateIngredient(ingredientSix);
                                createTransaction(transactionInfo);
                            }
                        }
                    }
                }
            }
        createSale(salesInfo);
        });
    });
});
});


//Equation:
// Ingredient Qty Sold(lbs) = (Recipe Qty(in lbs per keg) / 165 (pints per keg)) * # pints sold

//Example:
// 500 Pints of Porter sold in one week, how much pale malt was sold?
// 29.45 lbs of Malt are needed to make one keg of porter

// (29.45/165)*500 = 89.24

mySales();

//Display My Sales Transactions Table:
function mySales() {
  $("#mySalesDisplay").empty();
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


    $("#mySalesDisplay").prepend(tableRow);
    $("#mySalesDisplay").prepend(tableRowHead);
    // focus on table display
    // document.location.href = "#mySalesDisplay";
  }
  }
});
});
} //End My Sales


function updateIngredient(info) {
    $.ajax({
      method: "PUT",
      url: "/api/ingredients",
      data: info
    })
    .done(function() {
        console.log("Yay Success");
    });
}

function createSale(info) {
    $.ajax({
      method: "POST",
      url: "/api/sales",
      data: info
    })
    .done(function() {
        console.log("Yay Created");
        $("#salesMessage").html("<p><strong>Submission Successful!</strong></p>")
        $("#pintsSold").val("");
        mySales();
    });
}

function createTransaction(info) {
    $.ajax({
      method: "POST",
      url: "/api/transaction",
      data: info
    })
    .done(function() {
        console.log("Yay Created Transaction");
        $("#pintsSold").val("");
    });
}