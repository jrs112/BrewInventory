module.exports = function(sequelize, DataTypes) {
  var Extra = sequelize.define("Extra", {
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

  return Extra;
};