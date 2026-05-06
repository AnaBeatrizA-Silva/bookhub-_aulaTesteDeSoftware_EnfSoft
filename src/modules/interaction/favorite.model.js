const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const Favorite = sequelize.define('Favorite', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 }
}, {
  tableName: 'favorites',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['userId', 'bookId']
    }
  ]
});

module.exports = Favorite;