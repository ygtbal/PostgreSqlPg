import db from '../../private_models';
import express from 'express';
// import Sequelize from 'sequelize';
import configJson from '../../bin/config';
const app = express();

const pg = require('pg');
const md5 = require('md5');

const config = configJson['development'];

app.post('/', (req, res) => {
  const regCode = md5(md5(req.body.name.toLowerCase()) + md5(configJson['cloud']['salt']));
  const postBody = {
    name: req.body.name.toLowerCase(),
    regCode,
  }
  db.Business.create(postBody).then(() => {
    const pool = new pg.Pool({
      user: config.username,
      host: config.host,
      database: config.dialect,
      password: config.password,
      port: '5432',
    });
    pool.query(`CREATE DATABASE ${req.body.name}`).then((resul) => {
      return res.json({
        type: true,
        code: regCode,
        message: 'Kayıt Başarıyla tamamlandı',
      });
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