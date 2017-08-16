USE brew_db;

INSERT INTO recipes(item, projected_sales, ingredient_one, quantity_one, ingredient_two, quantity_two)
VALUES ("IPA", 40, "Malt",28, "Hops", 1.418);

INSERT INTO recipes(item, projected_sales, ingredient_one, quantity_one, ingredient_two, quantity_two, ingredient_three, quantity_three)
VALUES ("Porter", 50, "Malt",29.8375, "Hops", .121, "Chocolate Malt", 3.875);


INSERT INTO recipes(item, projected_sales, ingredient_one, quantity_one, ingredient_two, quantity_two, ingredient_three, quantity_three, ingredient_four, quantity_four)
VALUES ("Brown Ale", 100,"Malt",32.74, "Barley", .484, "Hops", .291, "Yeast", .05);


INSERT INTO recipes(item, projected_sales, ingredient_one, quantity_one, ingredient_two, quantity_two, ingredient_three, quantity_three)
VALUES ("Pilsner", 200, "Pale Dry Extract",17.05, "Hops", .375, "Yeast", .05);

INSERT INTO recipes(item, projected_sales, ingredient_one, quantity_one, ingredient_two, quantity_two, ingredient_three, quantity_three, ingredient_four, quantity_four)
VALUES ("Lager", 500, "Barley",11.28, "Rice Flakes", 9.59, "Hops", .06, "Yeast", .05);


INSERT INTO recipes(item, projected_sales, ingredient_one, quantity_one, ingredient_two, quantity_two, ingredient_three, quantity_three, ingredient_four, quantity_four, ingredient_five, quantity_five, ingredient_six, quantity_six)
VALUES ("Stout", 100, "Malt",26.35, "Chocolate Malt",2.325, "Barley", 4.65, "Lactose",3.1, "Oats", 1.55, "Hops", .25);
