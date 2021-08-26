import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import database from './src/utils/database.js';
import verifyToken from './src/utils/auth_jwt.js';
import fs from 'fs';
import http from 'http';
import https from 'https';

import UserManagementRouter from './src/components/UserManagement/routes/UserManagementRouter.js';

dotenv.config({path: '.env'});

const app = express();
const port = process.env.PORT;


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

//Bind connection to error event (to get notification of connection errors)
database.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
  // Server health check:
  res.status(200).send({data: {message: "Welcome to CBEWS-L-MERN API"}});
});

app.use('/api/user_management', UserManagementRouter);
app.use('/api/data_visualization', (req, res) => res.send('Data visualization api'));
app.use('/api/community_risk_assessment', (req, res) => res.send('Community risk assessment api'));
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

app.listen(port, () => console.log(`Server running on port ${port}`));

// ***uncomment when running in production***
// Listen to both http & https ports
// const httpServer = http.createServer(app);
// const httpsServer = https.createServer({
//   key: fs.readFileSync('dynaslope.key'),
//   cert: fs.readFileSync('dynaslope.crt'),
// }, app);
// httpServer.listen(80, () => {
//   console.log('HTTP Server running on port 80');
// });

// httpsServer.listen(443, () => {
//   console.log('HTTPS Server running on port 443');
// });