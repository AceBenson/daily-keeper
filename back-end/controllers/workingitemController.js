var WorkingItem = require('../models/workingitem');
var endOfDay = require('date-fns/endOfDay');
var startOfDay = require('date-fns/startOfDay');

exports.workingitem_list = function(req, res, next) {
  WorkingItem.find()
    .populate('project')
    .exec(function (err, list_workingitems) {
      if (err) {return next(err); }

      res.json(list_workingitems);
    });
};

exports.workingitem_list_filter_by_date = function(req, res, next) {
  WorkingItem.find({
    start_time: {
      $gte: startOfDay(new Date(req.query.date)),
      $lte: endOfDay(new Date(req.query.date))
    }
  })
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
  // res.send('NOT IMPLEMENTED: workingitem create POST');

  var workingitem = new WorkingItem({
    project: req.body.project,
    start_time: req.body.start_time, 
    end_time: req.body.end_time,
    progress: req.body.progress,
    todo: req.body.todo
  });

  workingitem.save(function (err) {
    if (err) {
      console.log("Error: ", err);
      res.status(503).json({error: err})
      return
    }
    console.log("Create workingitem success: ", workingitem);
    res.json(workingitem);
  });
};

exports.workingitem_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: workingitem delete GET');
};

exports.workingitem_delete_post = function(req, res) {
  // res.send('NOT IMPLEMENTED: workingitem delete POST');

  WorkingItem.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      console.log("Error: ", err);
      res.status(503).json({error: err})
      return
    }
    console.log("Delete workingitem success");
    res.send("success");
  });
};

exports.workingitem_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: workingitem update GET');
};

exports.workingitem_update_post = function(req, res) {
  var workingitem = req.body;

  WorkingItem.findByIdAndUpdate(req.params.id, workingitem, {}, function (err) {
    if (err) {
      console.log("Error: ", err);
      res.status(503).json({error: err})
      return
    }
    console.log("Update workingitem success: ", workingitem);
    res.json(workingitem);
  });

};