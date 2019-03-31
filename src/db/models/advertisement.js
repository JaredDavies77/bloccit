'use strict';
module.exports = (sequelize, DataTypes) => {
  var Advertisement = sequelize.define('Advertisement', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Advertisement.associate = function(models) {
    Advertisement.hasMany(models.Banner, {
      foreignKey: "advId",
      as: "banners",
    });
  };
  Advertisement.associate = function(models) {
    Advertisement.hasMany(models.Rule, {
      foreignKey: "advId",
      as: "rules",
    });
  }
  return Advertisement;
};
