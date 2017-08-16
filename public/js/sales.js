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
        $("#salesMessage").html("<p>Submission Successful!</p>")
        $("#pintsSold").val("");
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