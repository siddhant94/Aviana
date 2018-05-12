const express = require('express');
const appController = require('../controllers/app-controller');

const router = express.Router();

router.post('/signup', (req, res) => {
  const response = appController.registerAppAndGenerateKey(req, res);
  return response;
});

module.exports = router;
