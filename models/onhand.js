module.exports = function(sequelize, DataTypes) {
  var OnHand = sequelize.define("OnHand", {
    ingredient: {
      type: DataTypes.STRING,
      allowNull: false
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.FLOAT
    }
  });

  return OnHand;
};