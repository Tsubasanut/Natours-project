const express = require('express');
const fs = require('fs');
const _ = require('lodash');
const returnErrorNoSuchID = require('../helpers');

const tourRouter = express.Router();

//initialize static
let toursSimple = {};
reloadStatic();

function writeFullToursFile(res, toursSimple, data) {
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple_new.json`,
    JSON.stringify(toursSimple),
    (err) => {
      res.contentType('application/json').json({
        status: 'Success',
        data: data,
      });
    }
  );
}

function reloadStatic() {
  toursSimple = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
  );
}

//#region Tours
const getAllTours = (req, res) => {
  res.contentType('application/json').status(200).json({
    status: 'success',
    results: toursSimple.length,
    data: toursSimple,
  });
};

const getOneTour = (req, res) => {
  let requestedTour = toursSimple.filter((el) => el.id === +req.params.id)[0];
  if (!requestedTour) {
    return returnErrorNoSuchID(res, req.params.id);
  }

  res.contentType('application/json').status(200).json({
    status: 'success',
    requestedAt: req.requestedAt,
    results: 1,
    data: requestedTour,
  });
};

const createNewTour = (req, res) => {
  //console.log(req.body);

  let newId = toursSimple.slice(-1).id + 1;
  let newTour = { ...req.body, id: newId };

  toursSimple.push(newTour);

  res.status(201);
  writeFullToursFile(res, toursSimple, { newTour });

  reloadStatic();
  /*
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple_new.json`,
    JSON.stringify(toursSimple),
    (err) => {
      res.contentType('application/json').status(201).json({
        status: 'Success',
        data: { newTour },
      });
    }
    );*/
};

const patchTour = (req, res) => {
  let requestedTour = toursSimple.filter((el) => el.id === +req.params.id)[0];
  if (!requestedTour) {
    return returnErrorNoSuchID(res, req.params.id);
  }

  //updating...
  _.merge(requestedTour, req.body);

  res.status(202);
  writeFullToursFile(res, toursSimple, { requestedTour });

  reloadStatic();
  /*
  res.status(204).json({
  status: 'Success',
  data: {
    tour: requestedTour,
  },
});*/
};

const deleteTour = (req, res) => {
  let requestedTourIdx = toursSimple.findIndex(
    (el) => el.id === +req.params.id
  );
  if (requestedTourIdx === -1) {
    return returnErrorNoSuchID(res, req.params.id);
  }

  let lengthBefore = toursSimple.length;
  toursSimple.splice(requestedTourIdx, 1);

  res.status(204);
  writeFullToursFile(res, toursSimple, {
    lengthBefore: lengthBefore,
    lengthAfter: toursSimple.length,
  });

  reloadStatic();
};
//#endregion

tourRouter.route('/').get(getAllTours).post(createNewTour);

tourRouter
  .route('/:id/:x?')
  .get(getOneTour)
  .patch(patchTour)
  .delete(deleteTour);

module.exports = tourRouter;
