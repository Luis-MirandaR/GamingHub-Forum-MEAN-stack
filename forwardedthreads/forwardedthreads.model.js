const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const forwardedThreadSchema = new Schema({
  userId:   { type: Schema.Types.ObjectId, ref: 'User', required: true },
  threadId: { type: Schema.Types.ObjectId, ref: 'Thread', required: true }
}, { timestamps: true });

module.exports = mongoose.model('ForwardedThread', forwardedThreadSchema);