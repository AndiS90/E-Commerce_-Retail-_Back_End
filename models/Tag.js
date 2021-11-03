const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Location model
class Tag extends Model {}

// create fields/columns for Location model
Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tag_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true, //will infer the table name to be equal to the model name, without any modifications:
    underscored: true,
    modelName: 'category'
  }
);

module.exports = Tag
