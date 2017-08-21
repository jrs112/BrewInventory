
getIngredients();
allRecipes();


$("#submitBeer").on("click", function(event) {
    event.preventDefault();
    var beerName = $("#beerName").val().trim();
    var projectedSales = $("#beerSales").val().trim();
    var ingredientOne = $("#ingredient1").val().trim();
    var qtyOne = $("#qt1").val().trim();
    var ingredientTwo = $("#ingredient2").val().trim();
    var qtyTwo = $("#qt2").val().trim();
    var ingredientThree = $("#ingredient3").val().trim();
    var qtyThree = $("#qt3").val().trim();
    var ingredientFour = $("#ingredient4").val().trim();
    var qtyFour = $("#qt4").val().trim();
    var ingredientFive = $("#ingredient5").val().trim();
    var qtyFive = $("#qt5").val().trim();
    var ingredientSix = $("#ingredient6").val().trim();
    var qtySix = $("#qt6").val().trim();

    beerInfo = {
         item: beerName,
         projected_sales: projectedSales,
         ingredient_one: ingredientOne,
         quantity_one: qtyOne
    };
    if (ingredientTwo != "None") {
        beerInfo["ingredient_two"] = ingredientTwo;
        beerInfo["quantity_two"] = qtyTwo;
    }
    if (ingredientThree != "None") {
        beerInfo["ingredient_three"] = ingredientThree;
        beerInfo["quantity_three"] = qtyThree;
    }
    if (ingredientFour != "None") {
        beerInfo["ingredient_four"] = ingredientFour;
        beerInfo["quantity_four"] = qtyFour;
    }
    if (ingredientFive != "None") {
        beerInfo["ingredient_five"] = ingredientFive;
        beerInfo["quantity_five"] = qtyFive;
    }
    if (ingredientSix != "None") {
        beerInfo["ingredient_six"] = ingredientSix;
        beerInfo["quantity_six"] = qtySix;
    }
    console.log(beerInfo);

    createBeer(beerInfo);

});

$("#saveIngredient").on("click", function(event) {
    event.preventDefault();
    $("#ingrediantMessageDisplay").empty();
    var ingredientName = $("#ingredientName").val().trim();
    var ingredientAmount = $("#ingredientAmount").val().trim();
    var ingredientInfo = {
        ingredient: ingredientName,
        quantity: ingredientAmount
    }

    createIngredient(ingredientInfo);
});

function createBeer(info) {
    $.ajax({
      method: "POST",
      url: "/api/recipe",
      data: info
    })
    .done(function() {
        console.log("Yay Created");
        emptyForm();
        allRecipes();

    });
}

function createIngredient(info) {
    $.ajax({
      method: "POST",
      url: "/api/ingredients",
      data: info
    })
    .done(function() {
        console.log("Yay Created");
        getIngredients();
        getUpdateIngredients();
        $("#ingredientName").val("");
        $("#ingredientAmount").val("");
        $("#ingrediantMessageDisplay").html("<p>Saved! You can now select this ingredient for your recipe!</p>");
    });
}


function emptyForm() {
   $("#beerName").val("");
   $("#beerSales").val("");
   $("#ingredient1").val("None");
   $("#qt1").val("");
   $("#ingredient2").val("None");
   $("#qt2").val("");
   $("#ingredient3").val("None");
   $("#qt3").val("");
   $("#ingredient4").val("None");
   $("#qt4").val("");
   $("#ingredient5").val("None");
   $("#qt5").val("");
   $("#ingredient6").val("None");
   $("#qt6").val("");
}

function getIngredients() {
    $(".ingredientType").empty();
    $(".ingredientType").append("<option value='None'>None</option>");
    $.get("/api/ingredients", function(req) {
        console.log(req);
        for (var i = 0; i < req.length; i++) {
            $(".ingredientType").append("<option value='" + req[i].ingredient + "'>" + req[i].ingredient + "</option>");
        }
    });
}

function getUpdateIngredients() {
    $(".ingredUpdateType").empty();
    $(".ingredUpdateType").append("<option value='None'>No Change</option>");
    $.get("/api/ingredients", function(req) {
        console.log(req);
        for (var i = 0; i < req.length; i++) {
            $(".ingredUpdateType").append("<option value='" + req[i].ingredient + "'>" + req[i].ingredient + "</option>");
        }
    });
}

function allRecipes() {
  $.get("/api/userinfo", function(req) {
  $.get("/api/recipe", function(request) {
    $("#currentRecipeDisplay").empty();
    var tableRowHead = $("<tr>");
    // Beer Column Head
    var beerHead = $("<th>");
    beerHead.addClass("tableRowHeadStyle");
    beerHead.text("Beer");
    tableRowHead.append(beerHead);
     // Projected Sales
    var saleHead = $("<th>");
    saleHead.addClass("tableRowHeadStyle");
    saleHead.text("Weekly Sales");
    tableRowHead.append(saleHead);
    // ingredient type column head
    var ingredientOneHead = $("<th>");
    ingredientOneHead.addClass("tableRowHeadStyle");
    ingredientOneHead.text("Ingred.");
    tableRowHead.append(ingredientOneHead);
    // Amount column head
    var amountOneHead = $("<th>");
    amountOneHead.addClass("tableRowHeadStyle");
    amountOneHead.text("lbs/keg");
    tableRowHead.append(amountOneHead);
    // ingredient type column head
    var ingredientTwoHead = $("<th>");
    ingredientTwoHead.addClass("tableRowHeadStyle");
    ingredientTwoHead.text("Ingred.");
    tableRowHead.append(ingredientTwoHead);
    // Amount column head
    var amountTwoHead = $("<th>");
    amountTwoHead.addClass("tableRowHeadStyle");
    amountTwoHead.text("lbs/keg");
    tableRowHead.append(amountTwoHead);
     // ingredient type column head
    var ingredientThreeHead = $("<th>");
    ingredientThreeHead.addClass("tableRowHeadStyle");
    ingredientThreeHead.text("Ingred.");
    tableRowHead.append(ingredientThreeHead);
    // Amount column head
    var amountThreeHead = $("<th>");
    amountThreeHead.addClass("tableRowHeadStyle");
    amountThreeHead.text("lbs/keg");
    tableRowHead.append(amountThreeHead);
     // ingredient type column head
    var ingredientFourHead = $("<th>");
    ingredientFourHead.addClass("tableRowHeadStyle");
    ingredientFourHead.text("Ingred.");
    tableRowHead.append(ingredientFourHead);
    // Amount column head
    var amountFourHead = $("<th>");
    amountFourHead.addClass("tableRowHeadStyle");
    amountFourHead.text("lbs/keg");
    tableRowHead.append(amountFourHead);
     // ingredient type column head
    var ingredientFiveHead = $("<th>");
    ingredientFiveHead.addClass("tableRowHeadStyle");
    ingredientFiveHead.text("Ingred.");
    tableRowHead.append(ingredientFiveHead);
    // Amount column head
    var amountFiveHead = $("<th>");
    amountFiveHead.addClass("tableRowHeadStyle");
    amountFiveHead.text("lbs/keg");
    tableRowHead.append(amountFiveHead);
     // ingredient type column head
    var ingredientSixHead = $("<th>");
    ingredientSixHead.addClass("tableRowHeadStyle");
    ingredientSixHead.text("Ingred.");
    tableRowHead.append(ingredientSixHead);
    // Amount column head
    var amountSixHead = $("<th>");
    amountSixHead.addClass("tableRowHeadStyle");
    amountSixHead.text("lbs/keg");
    tableRowHead.append(amountSixHead);
    // Options column head
    var optionHead = $("<th>");
    optionHead.addClass("tableRowHeadStyle");
    optionHead.text("Options");
    tableRowHead.append(optionHead);

    //Display My Sales Table Body
    console.log(request);
    for (var i = 0; i < request.length; i++) {
      var tableRow = $("<tr>");
      //Beer
      var beer = $("<td>");
      beer.addClass("tableRowStyle");
      beer.text(request[i].item);
      tableRow.append(beer);
      // Projected Sales
      var sale = $("<td>");
      sale.addClass("tableRowStyle");
      sale.text(request[i].projected_sales);
      tableRow.append(sale);
      // First Ingredient
      var ingredientOne = $("<td>");
      ingredientOne.addClass("tableRowStyle");
      ingredientOne.text(request[i].ingredient_one);
      tableRow.append(ingredientOne);
      // Amount for Recipe
      var amountOne = $("<td>");
      amountOne.addClass("tableRowStyle");
      amountOne.text(request[i].quantity_one);
      tableRow.append(amountOne);

      // 2nd ingredient
      if(request[i].ingredient_two != null) {
      var ingredientTwo = $("<td>");
      ingredientTwo.addClass("tableRowStyle");
      ingredientTwo.text(request[i].ingredient_two);
      tableRow.append(ingredientTwo);
      // Amount for Recipe
      var amountTwo = $("<td>");
      amountTwo.addClass("tableRowStyle");
      amountTwo.text(request[i].quantity_two);
      tableRow.append(amountTwo);
      } else {
      var ingredientTwo = $("<td>");
      ingredientTwo.addClass("tableRowStyle");
      ingredientTwo.text("");
      tableRow.append(ingredientTwo);

      var amountTwo = $("<td>");
      amountTwo.addClass("tableRowStyle");
      amountTwo.text("");
      tableRow.append(amountTwo)
      }

      // 3rd Ingredient
      if(request[i].ingredient_three != null) {
      var ingredientThree = $("<td>");
      ingredientThree.addClass("tableRowStyle");
      ingredientThree.text(request[i].ingredient_three);
      tableRow.append(ingredientThree);
      // Amount for Recipe
      var amountThree = $("<td>");
      amountThree.addClass("tableRowStyle");
      amountThree.text(request[i].quantity_three);
      tableRow.append(amountThree);
      } else {
      var ingredientThree = $("<td>");
      ingredientThree.addClass("tableRowStyle");
      ingredientThree.text("");
      tableRow.append(ingredientThree);

      var amountThree = $("<td>");
      amountThree.addClass("tableRowStyle");
      amountThree.text("");
      tableRow.append(amountThree)
      }

      // 4th Ingredient
      if(request[i].ingredient_four != null) {
      var ingredientFour = $("<td>");
      ingredientFour.addClass("tableRowStyle");
      ingredientFour.text(request[i].ingredient_four);
      tableRow.append(ingredientFour);
      // Amount for Recipe
      var amountFour = $("<td>");
      amountFour.addClass("tableRowStyle");
      amountFour.text(request[i].quantity_four);
      tableRow.append(amountFour);
      } else {
      var ingredientFour = $("<td>");
      ingredientFour.addClass("tableRowStyle");
      ingredientFour.text("");
      tableRow.append(ingredientFour);

      var amountFour = $("<td>");
      amountFour.addClass("tableRowStyle");
      amountFour.text("");
      tableRow.append(amountFour)
      }

      // 5th Ingredient
      if(request[i].ingredient_five != null) {
      var ingredientFive = $("<td>");
      ingredientFive.addClass("tableRowStyle");
      ingredientFive.text(request[i].ingredient_five);
      tableRow.append(ingredientFive);
      // Amount for Recipe
      var amountFive = $("<td>");
      amountFive.addClass("tableRowStyle");
      amountFive.text(request[i].quantity_five);
      tableRow.append(amountFive);
      } else {
      var ingredientFive = $("<td>");
      ingredientFive.addClass("tableRowStyle");
      ingredientFive.text("");
      tableRow.append(ingredientFive);

      var amountFive = $("<td>");
      amountFive.addClass("tableRowStyle");
      amountFive.text("");
      tableRow.append(amountFive)
      }

      // 6th Ingredient
      if(request[i].ingredient_six != null) {
      var ingredientSix = $("<td>");
      ingredientSix.addClass("tableRowStyle");
      ingredientSix.text(request[i].ingredient_six);
      tableRow.append(ingredientSix);
      // Amount for Recipe
      var amountSix = $("<td>");
      amountSix.addClass("tableRowStyle");
      amountSix.text(request[i].quantity_six);
      tableRow.append(amountSix);
      } else {
      var ingredientSix = $("<td>");
      ingredientSix.addClass("tableRowStyle");
      ingredientSix.text("");
      tableRow.append(ingredientSix);

      var amountSix = $("<td>");
      amountSix.addClass("tableRowStyle");
      amountSix.text("");
      tableRow.append(amountSix)
      }

      var options = $("<td>");
      options.addClass("tableRowStyle");
      options.append("<button class='btn btn-primary updateRecBtn btn-xs' data-id='" + request[i].id + "'>Update</button>" +
                      "<button class='btn btn-danger deleteRecBtn btn-xs' data-id='" + request[i].id + "'>Delete</button>");
      tableRow.append(options);

      $("#currentRecipeDisplay").prepend(tableRow);
      $("#currentRecipeDisplay").prepend(tableRowHead);
      // focus on table display
      // document.location.href = "#dashboardDisplay";
    }

    $(".deleteRecBtn").on("click", function(event) {
            event.preventDefault();
            var delRecipe = {
                id: $(this).attr("data-id")
            };
            deleteRecipe(delRecipe);
        });

    $(".updateRecBtn").on("click", function(event) {
      event.preventDefault();
      $("#currentRecipeDisplay").empty();
      updateRecId = $(this).attr("data-id");
      $.get("/api/recipe/" + updateRecId)
      .done(function(data) {
        if(data.ingredient_two != null) {
          var ingredientTwoInfo = data.ingredient_two;
          var quantityTwoInfo = data.quantity_two;
        } else{
          var ingredientTwoInfo = "None";
          var quantityTwoInfo = 0;
        }
        if(data.ingredient_three != null) {
          var ingredientThreeInfo = data.ingredient_three;
          var quantityThreeInfo = data.quantity_three;
        } else{
          var ingredientThreeInfo = "None";
          var quantityThreeInfo = 0;
        }
        if(data.ingredient_four != null) {
          var ingredientFourInfo = data.ingredient_four;
          var quantityFourInfo = data.quantity_four;
        } else{
          var ingredientFourInfo = "None";
          var quantityFourInfo = 0;
        }
        if(data.ingredient_five != null) {
          var ingredientFiveInfo = data.ingredient_five;
          var quantityFiveInfo = data.quantity_five;
        } else{
          var ingredientFiveInfo = "None";
          var quantityFiveInfo = 0;
        }
        if(data.ingredient_six != null) {
          var ingredientSixInfo = data.ingredient_six;
          var quantitySixInfo = data.quantity_six;
        } else{
          var ingredientSixInfo = "None";
          var quantitySixInfo = 0;
        }
        console.log(data);
        var wellSection = $("<div>");
        wellSection.attr("id", "recipeWell");
        $("#currentRecipeDisplay").append(wellSection);
        $("#recipeWell").append("<div class='col-md-3'></div><div class='col-md-6'><div class='well'><h2  class='updateRecHeader header'>Update: " + data.item + "</h2>" +
                              "<div class='form-group'> <label>Beer Name(currently: " + data.item + ") </label><input type='text' class='form-control' id='updateBeerName'></div>" +
                              "<div class='form-group'> <label>Projected Weekly Sales(currently: " + data.projected_sales + ") </label><input type='text' size='4' id='updateProjSales'></div>" +
                              "<div class='form-group'> <label>1st Ingredient(currently: " + data.ingredient_one + ") </label><select class='ingredUpdateType' id='updateIngredientOne'></select>" +
                              "<label>Qty(currently: " + data.quantity_one + ")</label><input type='text' size='4' id='updateQtyOne'></div>" +
                              "<div class='form-group'> <label>2nd Ingredient(currently: " + ingredientTwoInfo + ") </label><select class='ingredUpdateType' id='updateIngredientTwo'></select>" +
                              "<label>Qty(currently: " + quantityTwoInfo + ")</label><input type='text' size='4' id='updateQtyTwo'></div>" +
                              "<div class='form-group'> <label>3rd Ingredient(currently: " + ingredientThreeInfo + ") </label><select class='ingredUpdateType' id='updateIngredientThree'></select>" +
                              "<label>Qty(currently: " + quantityThreeInfo + ")</label><input type='text' size='4' id='updateQtyThree'></div>" +
                              "<div class='form-group'> <label>4th Ingredient(currently: " + ingredientFourInfo + ") </label><select class='ingredUpdateType' id='updateIngredientFour'></select>" +
                              "<label>Qty(currently: " + quantityFourInfo + ")</label><input type='text' size='4' id='updateQtyFour'></div>" +
                              "<div class='form-group'> <label>5th Ingredient(currently: " + ingredientFiveInfo + ") </label><select class='ingredUpdateType' id='updateIngredientFive'></select>" +
                              "<label>Qty(currently: " + quantityFiveInfo + ")</label><input type='text' size='4' id='updateQtyFive'></div>" +
                              "<div class='form-group'> <label>6th Ingredient(currently: " + ingredientSixInfo + ") </label><select class='ingredUpdateType' id='updateIngredientSix'></select>" +
                              "<label>Qty(currently: " + quantitySixInfo + ")</label><input type='text' size='4' id='updateQtySix'></div>" +
                              "<div class='form-group'><button class='btn btn-success' id='submitUpdateRecBtn'>Update</button>" +
                              "<button class='btn btn-warning' id='displayRecListBtn'>Back to Recipes</button></div></div><div class='col-md-3'></div>");

        getUpdateIngredients();
        document.location.href = "#currentRecipeDisplay";

        $("#submitUpdateRecBtn").on("click", function(submitEvent) {
          submitEvent.preventDefault();
          var newBeerName = $("#updateBeerName").val().trim();
          var newProjSales = $("#updateProjSales").val().trim();
          var newIngredientOne = $("#updateIngredientOne").val().trim();
          var newQtyOne = $("#updateQtyOne").val().trim();
          var newIngredientTwo = $("#updateIngredientTwo").val().trim();
          var newQtyTwo = $("#updateQtyTwo").val().trim();
          var newIngredientThree = $("#updateIngredientThree").val().trim();
          var newQtyThree = $("#updateQtyThree").val().trim();
          var newIngredientFour = $("#updateIngredientFour").val().trim();
          var newQtyFour = $("#updateQtyFour").val().trim();
          var newIngredientFive = $("#updateIngredientFive").val().trim();
          var newQtyFive = $("#updateQtyFive").val().trim();
          var newIngredientSix = $("#updateIngredientSix").val().trim();
          var newQtySix = $("#updateQtySix").val().trim();
          var updateRecInfo  = {
            "id": data.id
          };


          if (newBeerName != "") {
            updateRecInfo["item"] = newBeerName;
          }

          if (newProjSales != "") {
            updateRecInfo["projected_sales"] = newProjSales
          }

          if (newIngredientOne != "None") {
            updateRecInfo["ingredient_one"] = newIngredientOne;
          }

          if (newQtyOne != "") {
            updateRecInfo["quantity_one"] = newQtyOne
          }

          if (newIngredientTwo != "None") {
            updateRecInfo["ingredient_two"] = newIngredientTwo;
          }

          if (newQtyTwo != "") {
            updateRecInfo["quantity_two"] = newQtyTwo
          }

          if (newIngredientThree != "None") {
            updateRecInfo["ingredient_three"] = newIngredientThree;
          }

          if (newQtyThree != "") {
            updateRecInfo["quantity_three"] = newQtyThree
          }

          if (newIngredientFour != "None") {
            updateRecInfo["ingredient_four"] = newIngredientFour;
          }

          if (newQtyFour != "") {
            updateRecInfo["quantity_four"] = newQtyFour
          }

          if (newIngredientFive != "None") {
            updateRecInfo["ingredient_five"] = newIngredientFive;
          }

          if (newQtyFive != "") {
            updateRecInfo["quantity_five"] = newQtyFive
          }

          if (newIngredientSix != "None") {
            updateRecInfo["ingredient_six"] = newIngredientSix;
          }

          if (newQtySix != "") {
            updateRecInfo["quantity_six"] = newQtySix
          }

          updateRecipe(updateRecInfo);


        });//End of update Recipe Btn

        $("#displayRecListBtn").on("click", allRecipes);

      });
    });



  });
  });
} //End All Receipts

function deleteRecipe(info) {
    $.ajax({
      method: "POST",
      url: "/deleterecipe",
      data: info
    })
    .done(function() {
        allRecipes();
        console.log("Deleted!");
    });
  }

  function updateRecipe(info) {
    $.ajax({
      method: "PUT",
      url: "/api/recipe",
      data: info
    })
    .done(function() {
        console.log("Updated!");
        allRecipes();
        // document.location.href = "#currentRecipeDisplay";
    });
  }