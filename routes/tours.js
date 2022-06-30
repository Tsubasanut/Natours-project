const express = require('express');
const toursController = require('../dev-data/controllers/toursController');

const tourRouter = express.Router();

tourRouter
  .route('/')
  .get(toursController.getAllTours)
  .post(toursController.createNewTour);

tourRouter
  .route('/:id/:x?')
  .get(toursController.getOneTour)
  .patch(toursController.patchTour)
  .delete(toursController.deleteTour);

module.exports = tourRouter;
