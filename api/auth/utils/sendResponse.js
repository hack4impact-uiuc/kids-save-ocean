const sendResponse = function(res, status, message, obj) {
  res.status(status).send({
    status,
    message,
    ...obj
  });
};

module.exports = {
  sendResponse
};
