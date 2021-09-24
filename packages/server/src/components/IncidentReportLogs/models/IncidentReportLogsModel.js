import mongoose from 'mongoose';
import connDb from '../../../utils/database.js';
import Users from '../../UserManagement/models/Users.js';
import FileUpload from '../../_Misc/FileUpload/FUModel.js';


const IncidentReportLogsSchema = new mongoose.Schema(
	{
		site_id:{
			type: Number,
			required: true,
			trim: true,
			maxLength: 2
		},
		incident_title: {
			type: String,
			required: true,
			trim: true,
			maxLength: 100
		},
		incident_report: {
			type: String,
			required: true,
			trim: true,
		},
		reporter_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: Users
		},
		incident_report_files: [{
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: FileUpload
		}],
	},
	{
		timestamps: { 
			createdAt: 'created_at', 
			updatedAt: 'modified_at' 
		}
	},
);

const IncidentReportLogs = connDb.SiteCollections.model('incident_report_logs', IncidentReportLogsSchema);

export default IncidentReportLogs;