module.exports = function(sequelize, DataTypes) {
  var Ingredient = sequelize.define("Ingredient", {
    ingredient: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    recent_loss_note: {
      type: DataTypes.STRING
    }
  },{
    timestamps: false
  });

  return Ingredient;
};