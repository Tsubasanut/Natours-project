const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const app = express();

//imports
const tourRouter = require('./routes/tours');
const userRouter = require('./routes/users');

const PORT = 3000;

//#region Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  req.requestedAt = new Date().toISOString();
  next();
});
app.use('/api/V1/tours', tourRouter);
app.use('/api/V1/users', userRouter);
/* basic routing
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

//#region helper functions

//#endregion

//#region Main handlers

//#region Users

//#endregion
//#endregion

//#region Server

app.listen(PORT, () => {
  console.log('listening on port ' + PORT + '...');
});
//#endregion
