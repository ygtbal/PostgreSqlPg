const express = require('express');
const app = express();
const path = require('path');
const basename = path.basename(__filename);

// Note: Özel erişim kontrolü

app.use((req, res, next) => {
  if (req.hostname !== 'localhost') {
    return res.json({
      type: false,
      message: 'hop hemşerim nereye ya'
    })
  }
  return next();
});

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