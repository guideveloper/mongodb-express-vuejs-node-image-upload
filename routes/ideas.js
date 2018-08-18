var express = require('express');
var router = express.Router();
var Idea = require('../models/Idea.js');
var passport = require('passport');
require('../config/passport')(passport);

/* GET ALL IDEAS */
router.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Idea.find({
        user: req.user._id
    },function (err, ideas) {
      if (err) return next(err);
      res.json(ideas);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

/* GET SINGLE IDEA BY ID */
router.get('/:id', function(req, res, next) {
  Idea.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE IDEA */
router.post('/', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Idea.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

/* UPDATE IDEA */
router.put('/:id', function(req, res, next) {
  Idea.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE IDEA */
router.delete('/:id', function(req, res, next) {
  Idea.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
