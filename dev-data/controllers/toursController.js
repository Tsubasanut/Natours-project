const fs = require('fs');
const _ = require('lodash');
const { mainDir } = require('./../../settings');

//initialize static
let toursSimple = {};
reloadStatic();

//#region helpers
function writeFullToursFile(res, toursSimple, data) {
  fs.writeFile(
    `${mainDir}/dev-data/data/tours-simple_new.json`,
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
    fs.readFileSync(`${mainDir}/dev-data/data/tours-simple.json`, 'utf-8')
  );
}

//#endregion

//#region Checks
exports.CheckNewTour = (req, res, next) => {
  let newId = toursSimple.slice(-1)[0].id + 1;
  req.newTour = { ...req.body, id: newId };

  //let's validate new tour (only obligatory fields)
  let validProps = ['name', 'price'];
  ////full validation agaist first existing object
  //let validProps = [...Object.keys(toursSimple[0])]
  let newTourValid = (prop) => {
    return validProps.every((prop) => req.newTour.hasOwnProperty(prop));
  };
  if (!newTourValid()) {
    return res
      .contentType('application/json')
      .status(400)
      .json({
        status: 'failure',
        results: 0,
        error: 'Incorrect tour format: ' + JSON.stringify(req.newTour),
        data: {},
      });
  }
  next();
};

exports.checkID = (req, res, next, val) => {
  let requestedTour = toursSimple.filter((el) => el.id === +val)[0];
  if (!requestedTour) {
    return res
      .contentType('application/json')
      .status(404)
      .json({
        status: 'failure',
        results: 0,
        error: 'CheckID - Invalid id: ' + val,
        data: {},
      });
  }
  next();
};
//#endregion

//#region Tours
exports.getAllTours = (req, res) => {
  res.contentType('application/json').status(200).json({
    status: 'success',
    results: toursSimple.length,
    data: toursSimple,
  });
};

exports.getOneTour = (req, res) => {
  let requestedTour = toursSimple.filter((el) => el.id === +req.params.id)[0];

  res.contentType('application/json').status(200).json({
    status: 'success',
    requestedAt: req.requestedAt,
    results: 1,
    data: requestedTour,
  });
};

exports.createNewTour = (req, res) => {
  //console.log(req.body);
  toursSimple.push(req.newTour);

  res.status(201);
  writeFullToursFile(res, toursSimple, req.newTour);

  reloadStatic();
  /*
  fs.writeFile(
    `${mainDir}/dev-data/data/tours-simple_new.json`,
    JSON.stringify(toursSimple),
    (err) => {
      res.contentType('application/json').status(201).json({
        status: 'Success',
        data: { newTour },
      });
    }
    );*/
};

exports.patchTour = (req, res) => {
  let requestedTour = toursSimple.filter((el) => el.id === +req.params.id)[0];

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

exports.deleteTour = (req, res) => {
  let requestedTourIdx = toursSimple.findIndex(
    (el) => el.id === +req.params.id
  );

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
