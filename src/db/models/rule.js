
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rule = sequelize.define('Rule', {
    description: DataTypes.STRING,
   topicId: {
     type: DataTypes.INTEGER,
     onDelete: "CASCADE",
     references: {
       model: "Topics",
       key: "id",
       as: "topicId",
     }
   },
   advId: {
    type: DataTypes.INTEGER,
    onDelete: "CASCADE",
    references: {
      model: "Advertisements",
      key: "id",
      as: "advId",
    }
  }
  }, {});
  Rule.associate = function(models) {
    Rule.belongsTo(models.Topic,{
      foreignKey: "topicId",
      onDelete: "CASCADE",
    });
    Rule.belongsTo(models.Advertisement,{
      foreignKey: "advId",
      onDelete: "CASCADE",
    });
  };
  return Rule;
};