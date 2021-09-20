import express from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';
import connDb from './src/utils/database.js';
import MongoStore from 'connect-mongo';
import authVerifyToken from './src/utils/authVerifyToken.js';

import UserManagementRouter from './src/components/UserManagement/routes/UserManagementRouter.js';
import CRARouter from './src/components/CommunityRiskAssessment/routes/CRARouter.js';
import MaintenanceLogsRouter from './src/components/MaintenanceLogs/routes/MaintenanceLogsRouter.js';
import IncidentReportLogsRouter from './src/components/IncidentReportLogs/routes/IncidentReportLogsRouter.js';

dotenv.config({path: '.env'});

const app = express();
const port = process.env.PORT;
const validity = 1000 * 60 * 60 * 24;

// SESSIONS STORE
const sessionStore = MongoStore.create({ 
  mongoUrl: 'mongodb://'+ process.env.DB_HOST +':27017/cbewsl_commons_db', 
  autoRemove: 'interval', 
  autoRemoveInterval: 10,
  mongoOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
});

app.use(helmet());
app.use(
    cors({
      credentials: true,
      origin: '*',
      optionsSuccessStatus: 200
    })
  );
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Use JWT for API authentication
app.use(authVerifyToken);
// Use session for API authentication
app.use(session({
  secret: process.env.SECRET_KEY,
  saveUninitialized:true,
  cookie: { maxAge: validity },
  resave: false,
  store: sessionStore
}));
// parse cookies
app.use(cookieParser());


app.get('/', (req, res) => {
  // Server health check:
  res.status(200).send({data: {message: "Welcome to CBEWS-L-MERN API"}});
});

app.use('/api/user_management', UserManagementRouter);
app.use('/api/cra', CRARouter);
app.use('/api', MaintenanceLogsRouter);
app.use('/api', IncidentReportLogsRouter);

app.use('/api/data_visualization', (req, res) => res.send('Data visualization api'));
app.use('/api/ewi_dissemination', (req, res) => res.send('EWI dissemination api'));
app.use('/api/surficial_data', (req, res) => res.send('Surficial data api'));
app.use('/api/subsurface_data', (req, res) => res.send('Subsurface data api'));
app.use('/api/earthquake_data', (req, res) => res.send('Earthquake data api'));
app.use('/api/rainfall_data', (req, res) => res.send('Rainfall data api'));
app.use('/api/alert_generation', (req, res) => res.send('Alert generation api'));

// This should be the last route else any after it won't work
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Fail",
    info: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

app.listen(port, () => console.log(`\nServer running on port ${port}`));