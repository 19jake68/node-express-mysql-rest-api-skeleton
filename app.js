'use strict';

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const i18n = require('i18n');
const app = express();
const initMySQL = require('./config/db.js');
const config = require('./config/app.js');

// Setup express server port from ENV. Default: 3000
app.set('port', config.port);

// Enable only in development HTTP request logger middleware
if (config.env === 'development') {
  app.use(morgan('dev'));
}

// for parsing json
app.use(bodyParser.json({ limit: '20mb' }));

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

// i18n
i18n.configure({
  locales: ['en', 'es'],
  directory: `${__dirname}/locales`,
  defaultLocale: 'en',
  objectNotation: true
});
app.use(i18n.init);

// Init all other stuff
app.use(cors());
app.use(compression());
app.use(helmet());

// Display empty route
app.get('/', (req, res) => {
  res.status(200).json({});
});

app.use(require('./app/routes'));
app.listen(app.get('port'));

// Init MySQL
initMySQL();
