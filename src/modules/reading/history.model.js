const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const ReadingHistory = sequelize.define('ReadingHistory', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  accessedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'reading_history',
  timestamps: false
});

module.exports = ReadingHistory;