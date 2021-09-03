import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({path: '.env'});

var connDb = [];
let commons_url = 'COMMONS_DB: mongodb://'+ process.env.DB_HOST +':27017/cbewsl_commons_db'
let senslope_url = 'SENSLOPE_DB: mongodb://'+ process.env.DB_HOST +':27017/senslopedb'


connDb.Commons = mongoose.createConnection(commons_url, 
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.on("error", console.error.bind(console, "MongoDB Connection Error>> : "))
.once("open", function() {
  console.log(commons_url);
});

connDb.Senslope = mongoose.createConnection(senslope_url, 
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
.on("error", console.error.bind(console, "MongoDB Connection Error>> : "))
.once("open", function() {
  console.log(senslope_url);
});

export default connDb;