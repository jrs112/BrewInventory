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

$("#submitReceipt").on("click", function() {
    var chosenIngredient = $("#ingredientDrop").val().trim();
    var chosenAmount = $("#qtyRec").val().trim();
    $.get("/api/ingredients", function(request) {
        for (var i = 0; i < request.length; i++) {
            if (chosenIngredient == request[i].ingredient) {
                var newAmount = request[i].quantity + parseInt(chosenAmount);
                var updateInfo = {
                    id: request[i].id,
                    quantity: newAmount
                };
                updateIngredient(updateInfo);
            }
        }
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

    });
}