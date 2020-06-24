import express from 'express';
import bodyParser from 'body-parser';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT || 8000;

const privateRoute = require('./private/index');
const cloudRoute = require('./cloud/index');
app.use('/private', privateRoute);
app.use('/cloud', cloudRoute);
app.listen(port, () => {
  console.log(`Server is runnign on PORT ${port}`)
})
export default app;