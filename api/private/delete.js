import db from '../../private_models';
import express from 'express';

const app = express();

app.delete('/', (req, res) => {
  db.Business.destroy({where: {}, truncate: true}).then(() => {
    return res.json({
      type: true,
      message: 'Tüm veriler silindi',
    })
  }).catch((err) => {
    return res.json({
      type: false,
      message: err.toString(),
    })
  })
})

module.exports = app;