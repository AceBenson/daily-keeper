var async = require('async')

var Project = require('../models/project');
var WorkingItem = require('../models/workingitem');

exports.project_list = function(req, res, next) {
  // res.send('NOT IMPLEMENTED: Project list');
  // async.waterfall([
  //   function (callback) {
  //     Project.find()
  //       .exec(callback);
  //   },
  //   function (args, callback) {
  //     console.log(args);
  //     args.map((arg, idx) => {
  //       WorkingItem.find({'project': arg._id})
  //         .exec(callback);
  //     });
  //   }
  // ], function (err, results) {
  //   if (err) { return next(err); }
  //   res.json(results);
  //   console.log(results);
  // });

  Project.find()
    .exec(function (err, list_projects) {
        if (err) {return next(err); }

        res.json(list_projects);
    });
};

exports.project_detail = function(req, res) {
  // res.send('NOT IMPLEMENTED: Project detail: ' + req.params.id);
  async.parallel({
    project: function (callback) {
      Project.findById(req.params.id)
        .exec(callback);
    },
    history: function (callback) {
      WorkingItem.find({'project': req.params.id}, "start_time end_time elapsed_time progress todo")
        .exec(callback);
    }
  }, function (err, results) {
    if (err) { return next(err); }

    res.json(results);
  });
};

exports.project_create_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Project create GET');
};

exports.project_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Project create POST');
};

exports.project_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Project delete GET');
};

exports.project_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Project delete POST');
};

exports.project_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Project update GET');
};

exports.project_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: Project update POST');
};