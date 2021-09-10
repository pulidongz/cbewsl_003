import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({path: '.env'});

var connDb = [];
let options = {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}
const commons_url = 'COMMONS_DB: mongodb://'+ process.env.DB_HOST +':27017/cbewsl_commons_db'
const cbewsl_site_collections_url = 'CBEWSL_DB: mongodb://'+ process.env.DB_HOST +':27017/cbewsl_site_collections_db'
const senslope_url = 'SENSLOPE_DB: mongodb://'+ process.env.DB_HOST +':27017/senslopedb'

connDb.Commons = mongoose.createConnection(commons_url, options)
.on("error", console.error.bind(console, "MongoDB Connection Error>> : "))
.once("open", function() {
  console.log(commons_url);
});

connDb.SiteCollections = mongoose.createConnection(cbewsl_site_collections_url, options)
.on("error", console.error.bind(console, "MongoDB Connection Error>> : "))
.once("open", function() {
  console.log(cbewsl_site_collections_url);
});

connDb.Senslope = mongoose.createConnection(senslope_url, options)
.on("error", console.error.bind(console, "MongoDB Connection Error>> : "))
.once("open", function() {
  console.log(senslope_url);
});

export default connDb;