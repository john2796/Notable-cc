const pgErrors = require("./pgError")

module.exports = (code, error, res) => {
  res.status(code).json({
    //Numeric type -> error code: othter types -> error message/object
    description: error && error.code ? pgErrors[error.code] : error
  })
}
