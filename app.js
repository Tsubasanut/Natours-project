const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
//imports
const tourRouter = require('./routes/toursRoutes');
const userRouter = require('./routes/usersRoutes');

const app = express();

//#region Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use('/api/V1/tours', tourRouter);
app.use('/api/V1/users', userRouter);
/*
app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString();
  next();
});

basic routing
const routes = ['/', '/api'];
app
  .route(routes)
  .get((req, res) => {
    res.status(200).send('Server is online');
  })
  .post((req, res) => {
    res.status(501).send('POST is not implemented yet');
  });
*/
//#endregion

module.exports = app;
