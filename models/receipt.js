module.exports = function(sequelize, DataTypes) {
  var Receipt = sequelize.define("Receipt", {
    receipt_id: {
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
    }
  });

  return Receipt;
};