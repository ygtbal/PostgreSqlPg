import express from 'express';
const app = express();

import db from '../../private_models/index';


app.post('/', (req, res) => {
  req.data.db['Users'].sync().then((result) => {
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
  }).catch((err) => {
    console.log({mes: err.toString()});
  })
})

module.exports = app;

