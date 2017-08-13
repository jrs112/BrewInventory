$.get("/api/userinfo", function(req) {
  console.log(req);
});


//Display Ingredient Table
$.get("/api/ingredients", function(request) {
  console.log(request);
  for (var i = 0; i < request.length; i++) {
    var tableRow = $("<tr>");
    //add ingredient column
    var ingredient = $("<td>");
    ingredient.text(request[i].ingredient);
    tableRow.append(ingredient);

    // quantity column

    var quantity = $("<td>");
    quantity.text(request[i].quantity);
    tableRow.append(quantity);

    //Below certain level column
    var dangerLevel = $("<td>");
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
    if (request[i].quantity < 0) {
      belowZero.addClass("belowZero");
      belowZero.text("Yes");
      tableRow.append(belowZero);
    } else{
      belowZero.text("No");
      tableRow.append(belowZero);
    }

     //Loss Note Column
    var lossNote = $("<td>");
    if (request[i].recent_loss_note != null) {
      lossNote.text(request[i].recent_loss_note);
      tableRow.append(lossNote);
    } else{
      lossNote.text("No losses");
      tableRow.append(lossNote);
    }
    $("#currentIngredients").append(tableRow);

  }
});
