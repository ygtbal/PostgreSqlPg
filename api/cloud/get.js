import express from 'express';
const app = express();
app.get('/', (req, res) => {
  req.data.db.Users.findAll({}).then((data) => {
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