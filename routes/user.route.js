// user.route.js

const express = require('express');
const userController = require('../controllers/user-controller');

const router = express.Router();

router.post('/signup', (req, res) => {
  const response = userController.saveUserIfNew(req, res);
  return response;
});

// user.route.js

router.post('/signin', (req, res) => {
  const response = userController.findUserAndAuthenticate(
    req.body.email, req.body.password,
    req.headers.app_key, res,
  );
  return response;
});

module.exports = router;
