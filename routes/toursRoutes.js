const express = require('express');
const toursController = require('./../dev-data/controllers/toursController');

const tourRouter = express.Router();

tourRouter.param('id', toursController.checkID);

tourRouter
  .route('/')
  .get(toursController.getAllTours)
  .post([toursController.CheckNewTour, toursController.createNewTour]);

tourRouter
  .route('/:id/:x?')
  .get(toursController.getOneTour)
  .patch(toursController.patchTour)
  .delete(toursController.deleteTour);

module.exports = tourRouter;
