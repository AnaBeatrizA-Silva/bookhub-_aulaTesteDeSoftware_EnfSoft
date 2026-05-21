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
    allowNull: false, // RN-34: Obrigatório
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false, // RN-34: Obrigatório
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false, // RN-34: Obrigatório
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
});

export { BookModel };