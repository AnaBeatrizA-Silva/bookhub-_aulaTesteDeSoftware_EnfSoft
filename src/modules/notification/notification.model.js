const { DataTypes } = require('sequelize');
const sequelize = require('../../database');

const Notification = sequelize.define('Notification', {
  id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
  message: { type: DataTypes.STRING },
  isRead: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  tableName: 'notifications',
  timestamps: true
});

module.exports = Notification;