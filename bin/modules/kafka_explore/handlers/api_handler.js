
const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
const { ERROR: httpError, SUCCESS: http } = require('../../../helpers/http-status/status_code');


const producer = async (req, res) => {
  const producer = async () => {
    return commandHandler.producer(req.params);
  };

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Login User')
      : wrapper.response(res, 'success', result, 'Login User', http.OK);
  };
  sendResponse(await producer());
};

const consumer = async (req, res) => {
  const consumer = async () => {
    return commandHandler.consumer();
  };

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Login User')
      : wrapper.response(res, 'success', result, 'Login User', http.OK);
  };
  sendResponse(await consumer());
};
module.exports = {
  producer,
  consumer
};
