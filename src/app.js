import createError from 'http-errors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import flash from 'connect-flash';

import { routes } from './routes.js';
import { sequelize } from './config/database.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

app.use(flash()); 

app.use((req, res, next) => {
  res.locals.message = req.flash();
  res.locals.user = req.session?.user || null; 
  next(); 
});

app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', routes);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

sequelize.sync({ alter: true })
  .then(() => console.log('Sincronia realizada'))
  .catch(err => console.log('Erro de sincronia', err));

export { app };