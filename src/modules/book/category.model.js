const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const Category = sequelize.define('Category', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  name: { type: DataTypes.STRING, unique: true }
}, {
  tableName: 'categories',
  timestamps: false
});

module.exports = Category;