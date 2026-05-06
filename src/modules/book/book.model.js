const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const Book = sequelize.define('Book', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  title: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  contentUrl: { type: DataTypes.STRING },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  tableName: 'books',
  timestamps: true
});

module.exports = Book;