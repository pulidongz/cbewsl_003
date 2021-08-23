import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({path: '.env'});

const url = 'mongodb://'+ process.env.DB_HOST +':27017/cbewsl_commons_db'

console.log(url);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(err => {
    console.log("Cannot connect to the database: ", err);
    process.exit();
  });

const database = mongoose.connection;

export default database;