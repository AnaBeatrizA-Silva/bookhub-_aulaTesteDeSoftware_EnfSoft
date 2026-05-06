const sequelize = require('../../database');
const { DataTypes } = require('sequelize');

const BookCategory = sequelize.define('BookCategory', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 }
}, {
  tableName: 'book_categories',
  timestamps: false
});

module.exports = BookCategory;