const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrySchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  hostelName: { type: String, required: true },
  hostelRoomNo: { type: String, required: true }
});

module.exports = mongoose.model('Entry', entrySchema);
