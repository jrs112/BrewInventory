$.get("/api/ingredients", function(request) {
    for (var i = 0; i < request.length; i++) {
        $("#ingredientDrop").append("<option value='" + request[i].id + "'>" + request[i].ingredient + "</option>");
    }
});



$("#submitLoss").on("click", function(event) {
    event.preventDefault();
    console.log("working");
    if ($("#qtyAdj-input").val().trim() != "" && $("#lossReason-input").val().trim() != "" ) {
        $.get("/api/userinfo", function(user) {
        $.get("/api/ingredients", function(req) {
            var chosenIngredient = $("#ingredientDrop").val().trim();
            var decrementAmount = $("#qtyAdj-input").val().trim();
            var lossNote = $("#lossReason-input").val().trim();
            var transactionId = user.id.toString() + user.transaction_counter.toString();
            var transactionInfo = {
                "transaction_id": transactionId,
                "transaction_type": "Loss",
                "UserId": user.id
            };
            var lossInfo = {
                "transaction_id": transactionId,
                "quantity": -decrementAmount,
                "note": lossNote,
                "UserId": user.id
            };
            for (var i = 0; i < req.length; i++) {
                if (req[i].id == chosenIngredient) {
                    var newQuantity =  req[i].quantity - decrementAmount;
                    var adjustInfo = {
                        id: chosenIngredient,
                        quantity: newQuantity
                    };
                    transactionInfo["start_amount"] = req[i].quantity;
                    transactionInfo["amount_changed"] = -decrementAmount;
                    transactionInfo["end_amount"] = newQuantity;
                    transactionInfo["ingredient"] = req[i].ingredient;
                    lossInfo["ingredient"] = req[i].ingredient;
                    updateIngredient(adjustInfo);
                    createLoss(lossInfo);
                    createTransaction(transactionInfo);
                }
            }
        });
        });
    } else{
        alert("You must fill all fields!");
    }
});

myLosses();

function myLosses() {
  $("#myLossesDisplay").empty();
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
  // ingredient column head
  var ingredientHead = $("<th>");
  ingredientHead.addClass("tableRowHeadStyle");
  ingredientHead.text("Ingredient");
  tableRowHead.append(ingredientHead);
  // change amount column head
  var changeHead = $("<th>");
  changeHead.addClass("tableRowHeadStyle");
  changeHead.text("Amount Changed");
  tableRowHead.append(changeHead);
  // end amount column head
  var noteHead = $("<th>");
  noteHead.addClass("tableRowHeadStyle");
  noteHead.text("Loss Note");
  tableRowHead.append(noteHead);

  //Display Ingredient Table
$.get("/api/userinfo", function(req) {
$.get("/api/losses", function(request) {

  console.log(request);

  for (var i = 0; i < request.length; i++) {
  if (req.id == request[i].UserId) {
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
    var ingredient = $("<td>");
    ingredient.addClass("tableRowStyle");
    ingredient.text(request[i].ingredient);
    tableRow.append(ingredient);
    // Ingredient Type
    var changed = $("<td>");
    changed.addClass("tableRowStyle");
    changed.text(request[i].quantity);
    tableRow.append(changed);

      //Start Amount
    var note = $("<td>");
    note.addClass("tableRowStyle");
    note.text(request[i].note);
    tableRow.append(note);


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

    $("#myLossesDisplay").prepend(tableRow);
    $("#myLossesDisplay").prepend(tableRowHead);

  }
  }
});
});
}


function updateIngredient(info) {
    $.ajax({
      method: "PUT",
      url: "/api/ingredients",
      data: info
    })
    .done(function() {
        console.log("Yay Success");
        $("#ingredientDrop").val("");
        $("#qtyAdj-input").val("");
        $("#lossReason-input").val("");
        myLosses();

    });
}

function createLoss(info) {
    $.ajax({
      method: "POST",
      url: "/api/losses",
      data: info
    })
    .done(function() {
        console.log("Yay Created");

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

    });
}