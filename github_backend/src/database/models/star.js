'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Star extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Star.init({
    repoid: DataTypes.STRING,
    userid: DataTypes.STRING,
    isstar: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Star',
    tableName: 'star',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true
  });
  return Star;
};