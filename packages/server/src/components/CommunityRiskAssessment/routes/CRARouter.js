import express from 'express';

import {
    FetchResource,
    UpdateResource
} from '../controllers/Resource.js';
import {
    FetchRiskProfile,
    UpdateRiskProfile,
    DeleteRiskProfile
} from '../controllers/RiskProfile.js'
import {
    FetchAllHazardMap,
    DeleteHazardMap,
    UploadHazardMap
} from '../controllers/HazardMap.js';


// ROUTE: /api/cra/

const CRARouter = express.Router();

CRARouter.get('/fetch/resource/:id', FetchResource);
CRARouter.patch('/update/resource/:id', UpdateResource);
CRARouter.get('/fetch/risk_profile/:id', FetchRiskProfile);
CRARouter.patch('/update/risk_profile/:id', UpdateRiskProfile);
CRARouter.delete('/delete/risk_profile/:id', DeleteRiskProfile);
CRARouter.get('/fetch/hazard_map/all', FetchAllHazardMap);
CRARouter.delete('/delete/hazard_map/:id', DeleteHazardMap);
CRARouter.post('/upload/hazard_map', UploadHazardMap);

export default CRARouter;