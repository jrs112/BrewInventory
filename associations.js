module.exports = function(db) {
    //ingredient belongs to recipe
  // db.Ingredient.belongsTo(db.Recipe, { foreignKey: { allowNull: false } });
  // db.Recipe.hasMany(db.Ingredient, { onDelete: "cascade" });
  // //Sales belongs to Onhand
  db.Sales.belongsTo(db.User, { foreignKey: { allowNull: false } });
  // db.OnHand.hasMany(db.Sales, { onDelete: "cascade" });
  // //Receipt belongs to Onhand
  db.Transaction.belongsTo(db.User, { foreignKey: { allowNull: false } });
  // db.OnHand.hasMany(db.Receipt, { onDelete: "cascade" });
  db.Losses.belongsTo(db.User, { foreignKey: { allowNull: false } });
  db.Receipt.belongsTo(db.User, { foreignKey: { allowNull: false } });

}