const express = require('express');
const router = express.Router();
const fs = require('fs');
const routesPath = `${__dirname}/`;
const { removeExtensionFromFile } = require('../middleware/utils');
const config = require('../../config/app');
const basePath = config.basePath;

/*
 * Load routes statically and/or dynamically
 */

// Loop routes path and loads every file as a route except this file
fs.readdirSync(routesPath).filter((file) => {
  // Take filename and remove last part (extension)
  const routeFile = removeExtensionFromFile(file);
  // Prevents loadingg of this file
  return routeFile !== 'index'
    ? router.use(`${basePath}/${routeFile}`, require(`./${routeFile}`))
    : '';
});

/*
 * Handle 404 error
 */
router.use('*', (req, res) => {
  res.status(404).json({
    errors: {
      msg: 'URL_NOT_FOUND'
    }
  });
});

module.exports = router;
