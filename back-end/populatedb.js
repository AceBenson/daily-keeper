var async = require('async')
var mongoose = require('mongoose')

var mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Project = require('./models/project');
var WorkingItem = require('./models/workingitem');

var projects = []
var workingitems = []

function projectCreate(name, color, tracked, status, cb) {
  var project = new Project({
    name: name,
    color: color,
    tracked: tracked, 
    status, status
  });

  project.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Project: ' + project);
    projects.push(project);
    cb(null, project);
  });
}

function workingItemCreate(project, start_time, end_time, progress, todo, cb) {
  workingitemdetail = {
    project: project,
    start_time: start_time, 
    end_time, end_time
  }
  if (progress != false) workingitemdetail.progress = progress;
  if (todo != false) workingitemdetail.todo = todo;

  var workingitem = new WorkingItem(workingitemdetail);
  workingitem.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New WorkingItem: ' + workingitem);
    workingitems.push(workingitem);
    cb(null, workingitem);
  });
}

function createProjects(cb) {
  async.parallel([
    function(callback) {
      projectCreate('Course', '#ff0000', 0, "Not Started", callback);
    },
    function(callback) {
      projectCreate('Machine Learning', '#00ff00', 15, "In Progress", callback);
    },
    function(callback) {
      projectCreate('Web', '#0000ff', 100, "Completed", callback);
    }
  ], cb);
}

function createWorkingItems(cb) {
  async.parallel([
    function(callback) {
      workingItemCreate(projects[0], '2021-07-20', '2021-07-21', 'progress test', 'todo test', callback);
    },
    function(callback) {
      workingItemCreate(projects[1], '2021-11-08', '2021-11-08', 'progress test 2', 'todo test 2', callback);
    },
    function(callback) {
      workingItemCreate(projects[1], '2021-07-27', '2021-07-29', false, false, callback);
    },
    function(callback) {
      workingItemCreate(projects[2], '2021-07-30', '2021-07-31', false, false, callback);
    },
  ], cb);
}

async.series(
  [
    createProjects,
    createWorkingItems
  ],
  function(err, results) {
    if (err) {
      console.log('FINAL ERR: '+err);
    }
    else {
      console.log('OK');
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
