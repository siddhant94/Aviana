const mongoDb = require('../config/db');
const AppUser = require('../models/app-model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const generateJWT = require('../helpers/jwt-generator');

async function registerAppAndGenerateKey(req, res) {
  try {
  // Checks for existing Apps
    const checkForExistingApp = await AppUser.findOne({ email: req.body.email });
    if (!checkForExistingApp) {
      // Generate hash for password
      const hashGeneratedForApp = await new Promise((resolve, reject) => {
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

      const keyLength = 36;
      // Create application key
      const createAppKey = (length) => {
        let result = '';
        result = Math.random().toString(length).slice(2);
        return result;
      };
      const appKey = createAppKey(keyLength);
      // Use the app object model for creating user schema object.
      const app = await new AppUser({
        _id: new mongoose.Types.ObjectId(),
        email: req.body.email,
        password: hashGeneratedForApp,
        app_key: appKey,
      });
      // Save user with created model.
      const saveApp = app.save();
      const status = await saveApp;
      if (status) {
        res.status(200).json({
          success: 'New App has been registered',
          email: status.email,
          api_key: status.app_key,
        });
      }
    }
    res.status(200).json({
      response: 'App already exists',
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
      action: 'registerAppAndGenerateKey',
    });
  }
  return res.send;
}

exports.registerAppAndGenerateKey = registerAppAndGenerateKey;
