const mongooose = require('mongoose');

const URI = process.env.MONGO_DB_URI;

async function connectDB() {
  try {
    await mongooose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to database');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDB;