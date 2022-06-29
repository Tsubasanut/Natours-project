const express = require('express');
//import * as helpers from './helpers';

const userRouter = express.Router();

/*userRouter.route('/').get(getAllUsers).post(createNewUser);

userRouter
  .route('/:id/:x?')
  .get(getOneTour)
  .patch(patchTour)
  .delete(deleteTour);
*/

module.exports = userRouter;
