import db from '../../private_models';
import express from 'express';
// import Sequelize from 'sequelize';
import configJson from '../../bin/config';
const app = express();

const Sequelize = require('sequelize');
const pg = require('pg');

const config = configJson['development'];
import CloudModels from '../../cloud_models/index';

app.post('/', async (req, res) => {
  db.Business.create(req.body).then(async () => {
    const pool = new pg.Pool({
      user: config.username,
      host: config.host,
      database: config.dialect,
      password: config.password,
      port: '5432',
    });
    pool.query(`CREATE DATABASE ${req.body.name}`).then(async (resul) => {
      const client = {
        username: config.username,
        host: config.host,
        database: req.body.name.toLowerCase(),
        password: config.password,
        dialect: config.dialect,
      };
      return res.json({
        type: true,
        message: 'DB Oluşturuldu',
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
})

module.exports = app;