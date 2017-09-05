'use strict';
module.exports = function(sequelize, DataTypes) {
  var Todos = sequelize.define("Todolist", {
    title: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Todos;
};