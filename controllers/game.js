const passport = require('passport');
const User = require('mongoose').model('user');

module.exports.getPartners = function(req, res, next) {
/*   if (!req.user._id)
    return res.status(403).send({status: "error has occured"}); */
  User.find({
    city: req.user.city,
    _id: {$ne: req.user._id},
    gender: req.user.looking_for.gender,
  }, (err, partners) => {
    if (err) return next(err);
    return res.send({status: "partners received successfully", partners});
  });
};

module.exports.rejectPartner = function(req, res, next) {
  if (!req.body.id) {
    return res.status(403).send({status: "error has occured"});
  }
  User.findOneAndUpdate({
    _id: req.user._id,
  }, {
    $push: { rejections: id },
  }, (err, doc) => {
    if (err) return next(err);
    return res.status(403).send({
      status: "user successfully updated",
      user: doc,
    });
  });
};

module.exports.approvePartner = function(req, res, next) {
  if (!req.body.id) {
    return res.status(403).send({status: "error has occured"});
  }
  User.findOneAndUpdate({
    _id: req.user._id,
  }, {
    $push: { approvals: id },
  }, (err, doc) => {
    if (err) return next(err);
    return res.status(403).send({
      status: "user successfully updated",
      user: doc,
    });
  });
};