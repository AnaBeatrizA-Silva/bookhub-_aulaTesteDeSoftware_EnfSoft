import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';

const BookModel = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
});

export { BookModel };