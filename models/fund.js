'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fund extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Fund.belongsToMany(models.User, {
        as: "userDonate",
        through: {
          model: "Transaction",
          as: "bridge",
        },
        foreignKey: "idFund",
      });

    }
  };
  Fund.init({
    title: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    goal: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    tableName: 'funds',
    modelName: 'Fund',
  });
  return Fund;
};