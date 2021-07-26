const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProjectSchema = new Schema(
  {
    name: {type: String, required: true},
    color: {type: String, required: true},
    tracked: {type: Number, default: 0},
    status: {type: String, enum: ["Not Started", "In Progress", "Completed"], default: "Not Started"}
  }
)

ProjectSchema
  .virtual('url')
  .get(function () {
    return '/project' + this._id;
  });

module.exports = mongoose.model('Project', ProjectSchema);