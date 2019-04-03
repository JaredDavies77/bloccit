'use strict';
module.exports = (sequelize, DataTypes) => {
  var Advertisement = sequelize.define('Advertisement', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },    
    description: {
      type: DataTypes.STRING,
      allowNull: false
   } }, {});
  Advertisement.associate = function(models) {
    Advertisement.hasMany(models.Banner, {
      foreignKey: "advId",
      as: "banners",
    }),
    Advertisement.hasMany(models.Rule, {
      foreignKey: "advId",
      as: "rules",
    });
  };
  return Advertisement;
};
