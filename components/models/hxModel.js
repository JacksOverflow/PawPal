import mongoose from 'mongoose'

const hxSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Types.ObjectId, ref: 'users' }
}, { timestamps: true })

//history is a model which has a schema hxSchema
module.exports = new mongoose.model('history', hxSchema);
