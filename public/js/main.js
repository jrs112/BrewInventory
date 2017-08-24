$.get("/api/userinfo", function(req) {
  if(req.role =="admin" || req.role == "sales" || req.role == "receipts") {
    $(".dashboardNavBar").append("<a href='/dashboard'>Dashboard</a>");
  }

  if (req.role == "receipts" || req.role == "admin") {
    $(".vendorNavBar").append("<a href='/vendor'>Vendors</a>");
    $(".receiptsNavBar").append("<a href='/receipts'>Receipts</a>");
  }
  if (req.role == "sales" || req.role == "admin") {
    $(".salesNavBar").append("<a href='/sales'>Sales</a>");
  }
  if (req.role == "admin") {
    $(".inventoryAdjustNavBar").append("<a href='/inventoryadjust'>Losses</a>");
    $(".recipeNavBar").append("<a href='/beers'>Manage Recipes</a>");
    $(".userNavBar").append("<a href='/user'>Update Users</a>");
  }



});