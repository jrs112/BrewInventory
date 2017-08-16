$.get("/api/vendors", function(req) {
    console.log(req);
    for (var i = 0; i < req.length; i++) {
        $("#vendor-input").append("<option value='" + req[i].id + "'>" + req[i].vendorname + "</option>");
    }
});

$.get("/api/ingredients", function(request) {
    for (var i = 0; i < request.length; i++) {
        $("#ingredientDrop").append("<option value='" + request[i].ingredient + "'>" + request[i].ingredient + "</option>");
    }
});

$("#submitReceipt").on("click", function(event) {
    event.preventDefault();
    $.get("/api/userinfo", function(user) {
        var chosenIngredient = $("#ingredientDrop").val().trim();
        var chosenAmount = $("#qtyRec").val().trim();
        var chosenVendor= $("#vendor-input").val().trim();
        var transactionId = user.id.toString() + user.transaction_counter.toString();
        var transactionInfo = {
            "transaction_id": transactionId,
            "transaction_type": "Receipt",
            "UserId": user.id,
            "ingredient": chosenIngredient
        };
        var receiptInfo = {
            "ingredient": chosenIngredient,
            "quantity": chosenAmount,
            "UserId": user.id,
            "receipt_id": transactionId,
            "VendorMasterId": chosenVendor
        };
        $.get("/api/ingredients", function(request) {
            for (var i = 0; i < request.length; i++) {
                if (chosenIngredient == request[i].ingredient) {
                    var newAmount = request[i].quantity + parseFloat(chosenAmount);
                    var updateInfo = {
                        id: request[i].id,
                        quantity: newAmount
                    };
                    transactionInfo["start_amount"] = request[i].quantity;
                    transactionInfo["amount_changed"] = parseFloat(chosenAmount);
                    transactionInfo["end_amount"] = newAmount;
                    updateIngredient(updateInfo);
                    createReceipt(receiptInfo);
                    createTransaction(transactionInfo);

                }
            }
        });
    });
});



function updateIngredient(info) {
    $.ajax({
      method: "PUT",
      url: "/api/ingredients",
      data: info
    })
    .done(function() {
        console.log("Yay Success");
        $("#qtyRec").val("");
        $("#receiptMessage").html("<p>Submission Successful!</p>");
    });
}

function createReceipt(info) {
    $.ajax({
      method: "POST",
      url: "/api/receipt",
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