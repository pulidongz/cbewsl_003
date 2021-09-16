import express from 'express';
import upload from '../../_Misc/FileUpload/FUMiddleware.js';

import { 
    FetchMaintenanceLogs,
    FetchAllMaintenanceLogs,
    UpdateMaintenanceLogs,
    DeleteMaintenanceLogs 
} from '../controllers/MaintenanceLogs.js';

// ROUTE: /api/<operation>/maintenance/log/

const MaintenanceLogsRouter = express.Router();

MaintenanceLogsRouter.get('/fetch/maintenance/logs/:site_id', FetchAllMaintenanceLogs);
MaintenanceLogsRouter.get('/fetch/maintenance/log/:id', FetchMaintenanceLogs);
MaintenanceLogsRouter.patch('/upsert/maintenance/log/:id', upload.single('file'), UpdateMaintenanceLogs);
MaintenanceLogsRouter.delete('/delete/maintenance/log/:id', DeleteMaintenanceLogs);

export default MaintenanceLogsRouter;