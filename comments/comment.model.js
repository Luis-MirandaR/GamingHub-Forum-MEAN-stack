const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  userId:    { type: Schema.Types.ObjectId, ref: 'User', required: true },
  threadId:  { type: Schema.Types.ObjectId, ref: 'Thread', required: true },
  text:      { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);