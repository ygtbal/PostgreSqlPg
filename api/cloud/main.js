import express from 'express';
const app = express();
const md5 = require('md5');

import db from '../../private_models/index';

app.post('/', (req, res) => {
  const regCode = req.body.regCode;
  db.Business.findOne({where: {regCode, name: req.data.prefix}}).then((business) => {
    if (!business) {
      return res.json({
        type: false,
        message: 'Şirket kaydı bulunamadı',
      })
    }
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
    return res.json({
      type: false,
      message: err.toString(),
    })
  })
});

module.exports = app;

