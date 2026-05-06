const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const Review = sequelize.define('Review', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  rating: { type: DataTypes.INTEGER, validate: { min: 1, max: 5 } },
  comment: { type: DataTypes.TEXT }
}, {
  tableName: 'reviews',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['userId', 'bookId']
    }
  ]
});

module.exports = Review;