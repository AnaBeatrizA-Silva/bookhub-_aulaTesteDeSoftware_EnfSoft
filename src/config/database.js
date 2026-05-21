import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Carrega as variáveis do arquivo .env para o código
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,      // Nome do banco (ex: bookhub_db)
  process.env.DB_USER,      // Usuário (ex: root)
  process.env.DB_PASSWORD,  // Senha do seu MariaDB
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306, 
    dialect: 'mariadb',
    logging: false,
    define: {
      timestamps: true,
    }
  }
);

export { sequelize };