// const JWTToken = require('../helpers/jwt-generator.js');
const mongoDb = require('../config/db');
const User = require('../models/user.model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const generateJWT = require('../helpers/jwt-generator');

async function saveUserIfNew(req, res) {
  try {
    // Checks for existing User
    const checkForExistingUser = await User.findOne({
      email: req.body.email,
      app_key: req.headers.app_key,
    });
    if (!checkForExistingUser) {
      // Generate hash for password
      const hashGenerated = await new Promise((resolve, reject) => {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            reject(err);
            res.status(500).json({
              error: err,
            });
          }
          resolve(hash);
        });
      });
      // Use the user object model for creating user schema object.
      const user = await new User({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hashGenerated,
        app_key: req.headers.app_key,
      });
      // Save user with created model.
      const saveUser = user.save();
      const status = await saveUser;
      if (status) {
        res.status(200).json({
          success: 'New user has been created',
          email: status.email,
        });
      }
    }
    res.status(200).json({
      response: 'User already exists', // Can add app's name in response for verbose error.
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
      action: 'saveUserIfNewError',
    });
  }
  return res.send;
}

async function findUserAndAuthenticate(userEmail, userPass, appKey, res) {
  try {
    // Find the user.
    const user = User.findOne({ email: userEmail, app_key: appKey });
    // Wait for user.findone to resolve in userDetails.
    const userDetails = await user;
    const comparePass = await new Promise((resolve, reject) => {
      bcrypt.compare(userPass, userDetails.password, (err, passCompResult) => {
        if (err) {
          reject(err);
          res.status(500).json({
            error: err,
          });
        }
        resolve(passCompResult);
      });
    });
    // If findings's success then proceed with token generation.
    if (comparePass) {
      const receivedToken = generateJWT.createAccessToken(
        userDetails.email, userDetails.id,
        userDetails.app_key,
      );
      if (!receivedToken) {
        res.status(401).json({
          failed: 'Unauthorized Access via token gen response',
        });
      }
      // Token generated respond with 200 and token.
      res.status(200).json({
        success: 'Welcome to the JWT Auth',
        token: receivedToken,
      });
    }
    res.status(401).json({
      failed: 'Unauthorized Access. Either user does not exist or password mismatch.',
    });
  } catch (err) {
    res.status(500).json({
      error: err,
      action: 'findUserAndAuthenticateError',
    });
  }
  // Since DB call did not resolve.
  return res.send;
}

async function verifyAccessToken(accessToken, res) {
  try {
    const secret = 'secret';
    const userInformation = await generateJWT.verifyJWTTokenForAccessToken(accessToken, secret);
    delete userInformation.app_key;
    res.json(userInformation);
  } catch (error) {
    const err = {
      err_text: 'Could not verify user (Either expired or wrong value',
      err_obj: error,
    };
    res.json(err);
  }
  return res.send;
}

async function isUserRegistered(req,res) {
  try{
  const checkForExistingUser = await User.findOne({
    email: req.body.email
  })
  if(!checkForExistingUser) {
    res.status(200).json({"present":false});
  }
    res.status(200).json({"present":true});
  } catch (err) {
    console.log('Mongo error', err);
    return res.status(500).send()
  }
}

exports.saveUserIfNew = saveUserIfNew;
exports.findUserAndAuthenticate = findUserAndAuthenticate;
exports.verifyAccessToken = verifyAccessToken;
exports.isUserRegistered = isUserRegistered;
