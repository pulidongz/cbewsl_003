import mongoose from 'mongoose';
import connDb from '../../../utils/database.js';
import Users from '../../UserManagement/models/Users.js';
import FileUploadSchema from '../../_Misc/FileUpload/FUModel.js';


const MaintenanceLogsSchema = new mongoose.Schema(
	{
		site_id:{
			type: Number,
			required: true,
			trim: true,
			maxLength: 2
		},
		maintenance_title: {
			type: String,
			required: true,
			trim: true,
			maxLength: 100
		},
		maintenance_report: {
			type: String,
			required: true,
			trim: true,
		},
		reporter_id: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: Users
		},
        maintenance_files: [FileUploadSchema],
	},
	{
		timestamps: { 
			createdAt: 'created_at', 
			updatedAt: 'modified_at' 
		}
	},
);

const MaintenanceLogs = connDb.SiteCollections.model('maintenance_logs', MaintenanceLogsSchema);

export default MaintenanceLogs;