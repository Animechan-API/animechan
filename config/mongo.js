const mongoose = require('mongoose');

module.exports.connect = async () => {
  try {
    await mongoose.connect(process.env.NODE_ENV !== 'production' ? 'mongodb://localhost:27017/animechan' : process.env.MONGO_URI, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    throw error;
  }
};

module.exports.disconnect = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    throw error;
  }
};
