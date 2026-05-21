import createError from 'http-errors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import flash from 'connect-flash';

// Importa o nosso centralizador de rotas modularizado
import { routes } from './routes.js';
import { sequelize } from './config/database.js';

const app = express();

// Configuração necessária para simular o __dirname no padrão de ES Modules (import)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// view engine setup (Estrutura idêntica à do professor usando o path.join)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'frase_secreta_aqui',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// CORREÇÃO AQUI: Adicionado os parênteses () para o connect-flash rodar como função e não travar a rota
app.use(flash()); 

app.use((req, res, next) => {
  res.locals.message = req.flash();
  // Mantivemos também a proteção do usuário logado na sessão
  res.locals.user = req.session?.user git || null; 
  next(); // Garante a passagem para as rotas abaixo sem travar
});

app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// LIGA AS ROTAS (Injeta o roteador central que criamos de forma limpa)
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler (Exatamente como o dele, renderizando a tela de erro original)
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Sincroniza o modelo com o banco de dados
sequelize.sync({ alter: true })
  .then(() => console.log('📦 Sincronia realizada'))
  .catch(err => console.log('❌ Erro de sincronia', err));

// Exporta o app (Equivalente moderno para module.exports = app)
export { app };