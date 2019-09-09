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

router.post('/verify', (req, res) => {
  const response = userController.verifyAccessToken(req.body.accessToken, res);
  return response;
});

router.post('/email/verify', (req, res) => {
  //console.log("Req",req);
  const response = userController.isUserRegistered(req,res);
  return response;
})


module.exports = router;
