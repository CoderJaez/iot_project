const uniqueValidator = require("mongoose-unique-validator");

const validator = (schema, _message) => {
  const message = _message ? _message : `{PATH} must be unique`;
  schema.plugin(uniqueValidator, {
    message: message,
  });
};
module.exports = validator;
