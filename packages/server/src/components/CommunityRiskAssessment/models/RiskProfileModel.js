import mongoose from 'mongoose';
import connDb from '../../../utils/database.js';
import Users from '../../UserManagement/models/Users.js';


const RiskProfileSchema = new mongoose.Schema(
	{
		site_id:{
			type: Number,
			required: true,
			trim: true,
			maxLength: 2
		},
		profile: {
			type: String,
			required: true,
			trim: true,
		},
		risk_count: {
			type: Number,
			required: true,
			trim: true,
			maxLength: 10,
			default: 0,
		},
		designee: {
			type: String,
			required: true,
			trim: true,
		},
		risk_type: {
			type: String,
			required: true,
			trim: true,
		},
		updated_by: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: Users
		},
	},
	{
		timestamps: { 
			createdAt: 'ts_uploaded', 
			updatedAt: 'ts_updated' 
		}
	},
);

const RiskProfile = connDb.SiteCollections.model('risk_profile', RiskProfileSchema);

export default RiskProfile;