const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const ReadingProgress = sequelize.define('ReadingProgress', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  currentPage: { type: DataTypes.INTEGER },
  progressPercent: { type: DataTypes.FLOAT }
}, {
  tableName: 'reading_progress',
  timestamps: true
});

module.exports = ReadingProgress;