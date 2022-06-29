function returnErrorNoSuchID(res, id) {
  return res
    .contentType('application/json')
    .status(404)
    .json({
      status: 'failure',
      results: 0,
      error: 'Invalid id: ' + id,
      data: {},
    });
}

module.exports = returnErrorNoSuchID;
