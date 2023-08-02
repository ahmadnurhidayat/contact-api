const { constants } = require('../constants');

const errorHandler = (req, res, next) => {
    const statusCOde = res.statusCOde ? res.statusCOde : 500;
    switch (statusCOde) {
      case constants.VALIDATION_ERROR:
        res.json({
          title: "Validation failed",
          message: err.message,
          stackTrace: err.stack,
        });

      case constants.FORBIDDEN:
        res.json({
          title: "Forbidden",
          message: err.message,
          stackTrace: err.stack,
        });

      case constants.UNAUTHORIZED:
        res.json({
          title: "Un Authorized",
          message: err.message,
          stackTrace: err.stack,
        });

      case constants.NOT_FOUND:
        res.json({
          title: "Not Found",
          message: err.message,
          stackTrace: err.stack,
        });

      case constants.SERVER_ERROR:
        res.json({
          title: "Server Error",
          message: err.message,
          stackTrace: err.stack,
        });

      default:
        console.log('No Error');
        break;
    }
};

module.exports = errorHandler;