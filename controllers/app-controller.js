const mongoDb = require('../config/db');
const AppUser = require('../models/app-model');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const generateJWT = require('../helpers/jwt-generator');

async function checkPassword(password, hash) {
    return await new Promise((resolve, reject) => {
	bcrypt.compare(password, hash, (err, res) => {
	    if(err) {
		return reject(err);
	    }

	    resolve(res);
	})
    })
}

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


async function findApp(loginCredentials) {
    try {
	var app =  await AppUser.findOne({email: loginCredentials.email});
	var res = await checkPassword(loginCredentials.password, app._doc.password);

	if(res)
	    return {email: app.email,
		    api_key: app._doc.app_key};
	else
	    return {err: true,
		    reason: "Wrong credentials."}
    }
    catch (e) {
	return {err: true,
		reason: "Could not find app."};
    }
}

module.exports = {
    registerAppAndGenerateKey: registerAppAndGenerateKey,
    findApp: findApp
};
