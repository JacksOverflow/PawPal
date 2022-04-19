import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { 
      type: String 
    },
    image: { 
      type: String, 
    },
  }, { timestamps: true })

//users is a model which has a schema userSchema
module.exports = new mongoose.model('users', userSchema);