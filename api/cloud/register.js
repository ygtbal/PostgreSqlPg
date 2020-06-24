import express from 'express';
const app = express();
app.post('/', (req, res) => {
  req.data.db.Users.create(req.body).then((data) => {
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