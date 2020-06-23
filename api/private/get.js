import db from '../../private_models';
import express from 'express';
const app = express();
app.get('/', (req, res) => {
  db.Business.findAll({}).then((data) => {
    return res.json({
      data,
    })
  }).catch((err) => {
    return res.json({
      type: false,
      message: err.toString(),
    })
  })
});

module.exports = app;