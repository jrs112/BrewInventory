$.get("/api/vendors", function(req) {
    console.log(req);
    for (var i = 0; i < req.length; i++) {
        $("#vendor-input").append("<option value='" + req[i].vendorname + "'>" + req[i].vendorname + "</option>");
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
            "vendor": chosenVendor
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

myReceiptTable();

//Display My Receipt Transactions Table:
function myReceiptTable() {
  $("#myReceiptsDisplay").empty();
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
    vendor.text(request[i].vendor);
    tableRow.append(vendor);

    $("#myReceiptsDisplay").prepend(tableRow);
    $("#myReceiptsDisplay").prepend(tableRowHead);
    // focus on table display
    // document.location.href = "#dashboardDisplay";
  }
  }
});
});
} //End My Receipts


function updateIngredient(info) {
    $.ajax({
      method: "PUT",
      url: "/api/ingredients",
      data: info
    })
    .done(function() {
        console.log("Yay Success");
        $("#qtyRec").val("");
        $("#receiptMessage").html("<p><strong>Submission Successful!</strong></p>");
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
        myReceiptTable();

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