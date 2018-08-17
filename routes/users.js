var passport = require('passport');
require('../config/passport')(passport);
var express = require('express');
var router = express.Router();
var User = require("../models/user");

const upload = require("../multer/storage");
const fs = require("fs");

/* GET ALL USERS */
router.get('/', passport.authenticate('jwt', { session: false }), function(req, res) {
	var token = getToken(req.headers);
	if (token) {
		User.find({$or:[
			{ username: req.query.user },
			{ email: req.query.user }
		]
		},function(err, users){
			if (err) return next(err);
			res.json(users);
		});
	} else {
	  	return res.status(403).send({success: false, msg: 'Unauthorized.'});
	}
});

/* UPDATE User */
router.put('/:id', function(req, res, next) {
	User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
	  if (err) return err;
	  res.json(post);
	});
});

module.exports = router;
