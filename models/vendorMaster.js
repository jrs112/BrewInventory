module.exports = function(sequelize, DataTypes) {
  var VendorMaster = sequelize.define("VendorMaster", {
    vendorname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telephone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    zip: {
        type: DataTypes.STRING,
        allowNull: false
    }

  });

  return VendorMaster;
};