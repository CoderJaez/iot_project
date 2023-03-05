require("dotenv/config");
const { BUILD } = process.env;
function errorHandler(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    // jwt authentication error
    return res.status(401).json({ message: "The user is not authorized" });
  }

  if (err.name === "ValidationError") {
    //validation error
    // const errMessages = [err.errors.split(",")];
    const validationErrors = {};
    for (const field in err.errors) {
      validationErrors[field] = err.errors[field].message;
    }
    return res.status(401).json({ success: false, message: validationErrors });
  }

  if (err.name === "CastError") {
    return res.status(500).json(err.message);
  }
  if (BUILD === "production")
    //default to 500 server error
    return res.status(500).json("Something went wrong.");

  return res.status(500).json({ message: err });
}

module.exports = errorHandler;
