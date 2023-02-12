const uniqueValidator = require("mongoose-unique-validator");

const validator = (schema) => {
  schema.plugin(uniqueValidator, {
    message: "{PATH} must be unique",
  });
};
module.exports = validator;
