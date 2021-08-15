var async = require('async')

var Project = require('../models/project');
var WorkingItem = require('../models/workingitem');

exports.project_list = function(req, res, next) {
  Project.find()
    .exec(function (err, list_projects) {
        if (err) {return next(err); }

        res.json(list_projects);
    });
};

exports.project_detail = function(req, res, next) {
  async.parallel({
    project: function (callback) {
      Project.findById(req.params.id)
        .exec(callback);
    },
    history: function (callback) {
      WorkingItem.find({'project': req.params.id})
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

exports.project_create_post = (req, res) => {
  var project = new Project({
    name: req.body.name,
    color: req.body.color,
  });

  Project.findOne({'name': req.body.name})
    .exec( function(err, found_project) {
      if (err) return next(err);
      if (found_project) {
        // res.send("Already exists");
        res.status(400).json({error: "Project already exists"})
      } else {
        project.save(function (err) {
          if (err) {
            console.log("Error: ", err);
            res.status(503).json({error: err})
            return
          }
          console.log("Create project success: ", project);
          res.json(project);
        });
      }
    });
}

exports.project_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Project delete GET');
};

exports.project_delete_post = function(req, res) {

  // Todo: Check workingItem belongs to this project and delete them

  Project.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      console.log("Error: ", err);
      res.status(503).json({error: err})
      return
    }
    console.log("Delete project success");
    res.send("success");
  });
};

exports.project_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: Project update GET');
};

exports.project_update_post = function(req, res) {
  var project = {
    name: req.body.name,
    color: req.body.color,
  };

  Project.findByIdAndUpdate(req.params.id, project, {}, function (err) {
    if (err) {
      console.log("Error: ", err);
      res.status(503).json({error: err})
      return
    }
    console.log("Update project success: ", project);
    res.json(project);
  });

};