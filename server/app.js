require('ignore-styles');
const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

require('babel-register')({
  ignore: /\/(build|node_modules)\//,
  presets: ['env', 'react-app'],
});

// routes
const routes = require('./routes/index');
const api = require('./routes/api');
// const universalLoader = require('./universal');

const app = express();

// Support Gzip
app.use(compression());

// use ejs templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Support post requests with body data (doesn't support multipart, use multer)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup logger
app.use(morgan('combined'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '../build')));

app.use('/api', api);

app.use('/', routes);

// Always return the main index.html, so react-router render the route in the client
// app.use('/', universalLoader)

module.exports = app;
