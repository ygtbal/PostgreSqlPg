const express = require('express');
const app = express();
const path = require('path');
const basename = path.basename(__filename);
import configJson from '../../bin/config';
import CloudModels from '../../cloud_models/index';

const config = configJson['development'];


app.use(async (req, res, next) => {
  if (req.hostname.split('.').length !== 3 && req.hostname.split('.')[1] !== 'localhost') {
    return res.json({
      type: false,
      message: 'Erişiminiz engellendi',
    });
  }
  if (req.originalUrl === '/xd') {
    return next();
  }
  req.data = {
    prefix: req.hostname.split('.')[0],
    db: null,
  }
  const client = {
    username: config.username,
    host: config.host,
    database: req.data.prefix,
    password: config.password,
    dialect: config.dialect,
  };
  req.data.db = await CloudModels(client);
  return next();
})

// Note: Özel erişim kontrolü
require('fs')
  .readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0) &&
      (file !== basename) &&
      (file.slice(-3) === '.js'
      );
  }).forEach((file) => {
    app.use(`/${file.split('.')[0]}`, require(__dirname + path.sep + file));
  });

module.exports = app;