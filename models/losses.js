module.exports = function(sequelize, DataTypes) {
  var Losses = sequelize.define("Losses", {
    transaction_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ingredient: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    note: {
      type: DataTypes.STRING
    }
  });

  return Losses;
};