$.get("/api/ingredients", function(request) {
    for (var i = 0; i < request.length; i++) {
        $("#ingredientDrop").append("<option value='" + request[i].id + "'>" + request[i].ingredient + "</option>");
    }
});



$("#submitLoss").on("click", function() {
    console.log("working");
    if ($("#qtyAdj-input").val().trim() != "" && $("#lossReason-input").val().trim() != "" ) {
        $.get("/api/ingredients", function(req) {
            var chosenIngredient = $("#ingredientDrop").val().trim();
            var decrementAmount = $("#qtyAdj-input").val().trim();
            var lossNote = $("#lossReason-input").val().trim();
            for (var i = 0; i < req.length; i++) {
                if (req[i].id == chosenIngredient) {
                    var newQuantity =  req[i].quantity - decrementAmount;
                    var adjustInfo = {
                        id: chosenIngredient,
                        quantity: newQuantity,
                        recent_loss_note: lossNote
                    };
                    updateIngredient(adjustInfo);
                }
            }
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