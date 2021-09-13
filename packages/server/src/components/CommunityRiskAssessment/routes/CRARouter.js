import express from 'express';

import {
    FetchResource,
    FetchAllResource,
    UpdateResource,
    DeleteResource
} from '../controllers/Resource.js';

import {
    FetchRiskProfile,
    FetchAllRiskProfile,
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
CRARouter.get('/fetch/resource/all/:site_id', FetchAllResource);
CRARouter.patch('/update/resource/:id', UpdateResource);
CRARouter.delete('/delete/resource/:id', DeleteResource);
CRARouter.get('/fetch/risk_profile/:id', FetchRiskProfile);
CRARouter.get('/fetch/risk_profile/all/:site_id', FetchAllRiskProfile);
CRARouter.patch('/update/risk_profile/:id', UpdateRiskProfile);
CRARouter.delete('/delete/risk_profile/:id', DeleteRiskProfile);
CRARouter.get('/fetch/hazard_map/all/:site_id', FetchAllHazardMap);
CRARouter.delete('/delete/hazard_map/:id', DeleteHazardMap);
CRARouter.post('/upload/hazard_map', UploadHazardMap);

export default CRARouter;