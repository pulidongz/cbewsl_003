import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({path: '.env'});

let url1 = 'COMMONS_DB: mongodb://'+ process.env.DB_HOST +':27017/cbewsl_commons_db'
let url2 = 'SENSLOPE_DB: mongodb://'+ process.env.DB_HOST +':27017/senslopedb'

console.log(url1);
console.log(url2);

const db1 = () => mongoose.createConnection(url1, 
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const db2 = () => mongoose.createConnection(url2, 
  { useNewUrlParser: true, useUnifiedTopology: true, seCreateIndex: true });

export default { db1, db2 };