var async = require('async')
// const { body,validationResult } = require('express-validator/check');
// const { sanitizeBody } = require('express-validator/filter');


var Project = require('../models/project');
var WorkingItem = require('../models/workingitem');

exports.project_list = function(req, res, next) {
  Project.find()
    .exec(function (err, list_projects) {
        if (err) {return next(err); }

        res.json(list_projects);
    });
};

exports.project_detail = function(req, res) {
  // res.send('NOT IMPLEMENTED: Project detail: ' + req.params.id);
  // console.log("PROJECT DETAIL");
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
  // console.log("TEST GET");
  res.send('NOT IMPLEMENTED: Project create GET');
};

exports.project_create_post = (req, res) => {
  console.log(`name: ${req.body.name}`);
  console.log(`color: ${req.body.color}`);

  var project = new Project({
    name: req.body.name,
    color: req.body.color,
  });

  // Todo: check project is already in database

  project.save(function (err) {
    if (err) {
      console.log("Error: ", err);
      res.send("Fail");
      return
    }
    console.log("Create project success: ", project);
    res.send("Success");
  });
}

// exports.project_create_post = [
//   body('name', 'Project name required').isLength({min: 1}).trim(),
//   sanitizeBody('name').trim().escape(),
//   (req, res, next) => {
//     const errors = validationResult(req);
//     console.log(req);
//     var project = new Project(
//       { name: req.body.name }
//     )

//     if (!errors.isEmpty()) {
//       console.error("Something is wrong when creating project.");
//       return;
//     }
//     else {
//       console.log("save~");
//       // project.save(function (err) {
//       //   if (err) return next(err);
//       // });
//     }
//   }
// ];

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