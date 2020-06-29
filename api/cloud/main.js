import express from 'express';
const app = express();

import db from '../../private_models/index';


app.post('/', async (req, res) => {
  req.data.db.Users.create({name: req.body.name}).then(() => {
    return res.json({
      type: true,
      message: 'Yeni Kullanıcı yaratılmıştır',
    })
  }).catch((err) => {
    return res.json({
      type: false,
      message: err.toString(),
    })
  })
})

module.exports = app;

