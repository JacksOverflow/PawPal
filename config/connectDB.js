const mongoose = require('mongoose')

const connectDB = () => {
  mongoose.connect &(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }, err => {
        console.log('connected')
    });
}

export default connectDB;