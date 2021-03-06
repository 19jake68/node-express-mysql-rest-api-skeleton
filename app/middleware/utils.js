/**
 * Removes extension from file
 * @param {string} file - filename
 */
exports.removeExtensionFromFile = (file) => file.split('.').slice(0, -1).join('.').toString();

/**
 * Handles error by printing to console in development env and builds and sends an error response
 * @param {Object} res - response object
 * @param {Object} err - error object
 */
exports.handleError = (res, err) => {
  // Prints error in console
  if (config.env === 'development') {
    console.log(err);
  }
  // Sends error to user
  res.status(err.code).json({
    errors: {
      msg: err.message
    }
  });
};

/**
 * Builds error object
 * @param {number} code - error code
 * @param {string} message - error text
 */
exports.buildErrObject = (code, message) => {
  return {
    code,
    message
  };
};

/**
 * Builds success object
 * @param {string} message - success text
 */
exports.buildSuccObject = (message) => {
  return {
    msg: message
  };
};
