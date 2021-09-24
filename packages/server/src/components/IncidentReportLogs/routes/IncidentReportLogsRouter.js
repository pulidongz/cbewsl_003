import express from 'express';
import FileUploadHandler from '../../_Misc/FileUpload/FUMiddleware.js';

import { 
    FetchAllIncidentReportLogs,
    FetchIncidentReportLogs,
    UpdateIncidentReportLogs,
    DeleteIncidentReportLogs 
} from '../controllers/IncidentReportLogs.js';

// ROUTE: /api/<operation>/incident_report/log/

const IncidentReportLogsRouter = express.Router();

IncidentReportLogsRouter.get('/fetch/incident_report/logs/:site_id', FetchAllIncidentReportLogs);
IncidentReportLogsRouter.get('/fetch/incident_report/log/:id', FetchIncidentReportLogs);
IncidentReportLogsRouter.patch('/upsert/incident_report/log/:id', FileUploadHandler, UpdateIncidentReportLogs);
IncidentReportLogsRouter.delete('/delete/incident_report/log/:id', DeleteIncidentReportLogs);

export default IncidentReportLogsRouter;