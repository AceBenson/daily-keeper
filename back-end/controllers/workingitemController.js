var WorkingItem = require('../models/workingitem');

exports.workingitem_list = function(req, res, next) {
  WorkingItem.find()
    .populate('project')
    .exec(function (err, list_workingitems) {
      if (err) {return next(err); }

      res.json(list_workingitems);
    });
};

exports.workingitem_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: workingitem detail: ' + req.params.id);
};

exports.workingitem_create_get = function(req, res) {
  res.send('NOT IMPLEMENTED: workingitem create GET');
};

exports.workingitem_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: workingitem create POST');
};

exports.workingitem_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: workingitem delete GET');
};

exports.workingitem_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: workingitem delete POST');
};

exports.workingitem_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: workingitem update GET');
};

exports.workingitem_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: workingitem update POST');
};