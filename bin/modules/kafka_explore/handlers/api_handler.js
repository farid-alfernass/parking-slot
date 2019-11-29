
const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
const { ERROR: httpError, SUCCESS: http } = require('../../../helpers/http-status/status_code');


const producer = async (req, res) => {
  const producer = async () => {
    return commandHandler.producer(req.body);
  };

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Fungsi consumer 22222 berhasil di eksekusi')
      : wrapper.response(res, 'success', result, 'Fungsi consumer kafka berhasil di eksekusi', http.OK);
  };
  sendResponse(await producer());
};

const consumer = async (req, res) => {
  const consumer = async () => {
    return commandHandler.consumer();
  };

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Fungsi consumer kafka berhasil dijalankan')
      : wrapper.response(res, 'success', result, 'Fungsi consumer kafka berhasil dijalankan', http.OK);
  };
  sendResponse(await consumer());
};
module.exports = {
  producer,
  consumer
};
