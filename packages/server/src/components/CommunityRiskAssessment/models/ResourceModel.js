import mongoose from 'mongoose';
import connDb from '../../../utils/database.js';


const ResourceSchema = new mongoose.Schema(
	{
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
		ts_updated: {
			type: String,
			required: true,
			trim: true,
		},
		// ts_updated: {
		// 	type: Date,
		// 	required: true,
		// 	default: Date.now()
		// },
		updated_by: {
			type: String,
			required: true,
			trim: true,
			maxLength: 24,
		},
	}
);

const Resource = connDb.SiteCollections.model('resources', ResourceSchema);

export default Resource;