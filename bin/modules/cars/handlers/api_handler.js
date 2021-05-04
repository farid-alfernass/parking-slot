
const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
const queryHandler = require('../repositories/queries/query_handler');
const validator = require('../utils/validator');
const { ERROR:httpError, SUCCESS:http } = require('../../../helpers/http-status/status_code');

const parkingCar = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandModel.carJoi);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.parkingCar(result.data);
  };

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'parking car')
      : wrapper.response(res, 'success', result, 'parking car', http.OK);
  };
  sendResponse(await postRequest(validatePayload));
};

const parkingOut = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandModel.carJoi);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.parkingOut(result.data);
  };

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'parking out')
      : wrapper.response(res, 'success', result, 'parking out', http.OK);
  };
  sendResponse(await postRequest(validatePayload));
};

const parkingSlot = async (req, res) => {
  const { carNumber } = req.query.carNumber || '';
  const getData = async () => queryHandler.parkingSlot(carNumber);
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Get Slot Information', httpError.NOT_FOUND)
      : wrapper.response(res, 'success', result, 'Get Slot Information', http.OK);
  };
  sendResponse(await getData());
};

module.exports = {
  parkingCar,
  parkingSlot,
  parkingOut
};
