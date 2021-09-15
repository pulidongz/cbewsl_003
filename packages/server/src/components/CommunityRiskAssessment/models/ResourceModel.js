import mongoose from 'mongoose';
import connDb from '../../../utils/database.js';
import Users from '../../UserManagement/models/Users.js';

const ResourceSchema = new mongoose.Schema(
	{
		site_id:{
			type: Number,
			required: true,
			trim: true,
			maxLength: 2
		},
		resource: {
			type: String,
			required: true,
			trim: true,
		},
		count: {
			type: Number,
			required: true,
			trim: true,
			maxLength: 10,
			default: 0,
		},
		updated_by: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: Users
		},
	},
	{
		timestamps: { 
			createdAt: 'ts_upload', 
			updatedAt: 'ts_update' 
		}
	},
);

const Resource = connDb.SiteCollections.model('resources', ResourceSchema);

export default Resource;