import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import database from './src/utils/database.js';

import UserManagementRouter from './src/components/UserManagement/routes/UserManagementRouter.js';

import Users from './src/components/UserManagement/models/Users.js';

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

app.listen(port, () => console.log(`Server running on port ${port}`));

app.get('/:users',(req, res)=>{
    const users = req.params.users;

    Users.findOne({username: users})
    .then(data => {
      if(data){
        res.status(200).send(data);
      } else {
        res.status(404).send("User not found");
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
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