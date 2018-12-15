const express = require('express');
const appController = require('../controllers/app-controller');

const router = express.Router();

router.post('/signup', (req, res) => {
  const response = appController.registerAppAndGenerateKey(req, res);
  return response;
});

router.post('/login', (req, res) => {
    appController.findApp({email: req.body.email,
			   password: req.body.password})
	.then(function (app) {
	    if(app.err)
		return res.status(403).json({
		    error: app.reason,
		    action: 'login',
		});
	    else	    
		return res.status(200).json(app);
	  })
})

module.exports = router;
