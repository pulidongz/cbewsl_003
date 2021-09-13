import mongoose from 'mongoose';
import connDb from '../../../utils/database.js';


const HazardMapSchema = new mongoose.Schema(
	{
		site_id:{
			type: Number,
			required: true,
			trim: true,
			maxLength: 2
		},
		filename: {
			type: String,
			required: true,
			trim: true,
            unique: true
		},
		filetype: {
			type: String,
			required: true,
			trim: true,
		},
		filesize: {
			type: String,
			required: true,
			trim: true,
		},
		uploaded_by: {
			type: String,
			required: true,
			trim: true,
			maxLength: 24,
		},
        ts_upload: {
			type: String,
			required: true,
			trim: true,
		},
	}
);

const HazardMap = connDb.SiteCollections.model('hazard_maps', HazardMapSchema);

export default HazardMap;