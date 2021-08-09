const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const opts = { toJSON: { virtuals: true }, toObject: { virtuals: true } };

const WorkingItemSchema = new Schema(
  {
    project: {type: Schema.Types.ObjectId, ref: 'Project', required: true},
    start_time: {type: Date, required: true},
    end_time: {type: Date, required: true},
    progress: {type: String},
    todo: {type: String},
  }, opts
);

WorkingItemSchema
  .virtual('elapsed_time')
  .get(function () {
    return this.end_time - this.start_time;
  });

WorkingItemSchema
  .virtual('url')
  .get(function () {
    return this._id;
  });

module.exports = mongoose.model('WorkingItem', WorkingItemSchema);