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
                "quantity": decrementAmount,
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