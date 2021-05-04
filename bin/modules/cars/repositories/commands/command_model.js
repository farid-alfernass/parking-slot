const joi = require('joi');

const carJoi = joi.object({
  carNumber: joi.string().required()
});

module.exports = {
  carJoi
};
