$.get("/api/recipe", function(req) {
    console.log(req);
    for (var i = 0; i < req.length; i++) {
        $("#beerType").append("<option value='" + req[i].item + "'>" + req[i].item + "</option>");
    }
});

$("#submit-sales").on("click", function() {
    $("#salesMessage").empty();
    var chosenItem = $("#beerType").val().trim();
    var pintsSold = $("#pintsSold").val().trim();
    var salesInfo = {
        "item_sold": chosenItem,
        "total_sales_units": pintsSold
    };
    var ingredientOne = {};
    var ingredientTwo = {};
    var ingredientThree = {};
    var ingredientFour = {};
    var ingredientFive = {};
    var ingredientSix = {};
    $.get("/api/recipe", function(request) {
        $.get("/api/ingredients", function(data) {
            for (var i = 0; i < request.length; i++) {
                if (request[i].item === chosenItem) {
                    if (request[i].ingredient_one != null) {
                        var ingredientOneAdjust = (request[i].quantity_one / 165) *  pintsSold;
                        console.log(ingredientOneAdjust);
                        for (var j = 0; j < data.length; j++) {
                            if (request[i].ingredient_one == data[j].ingredient) {
                                var newIngredientOneAmt = data[j].quantity - ingredientOneAdjust;
                                ingredientOne["id"] = data[j].id;
                                ingredientOne["quantity"] = newIngredientOneAmt;
                                updateIngredient(ingredientOne);
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
                                updateIngredient(ingredientTwo);
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
                                updateIngredient(ingredientThree);
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
                                updateIngredient(ingredientFour);
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
                                updateIngredient(ingredientFive);
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
                                updateIngredient(ingredientSix);
                            }
                        }
                    }
                }
            }
        });
    });
    createSale(salesInfo);
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