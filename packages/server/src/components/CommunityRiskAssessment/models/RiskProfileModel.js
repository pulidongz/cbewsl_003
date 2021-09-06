import mongoose from 'mongoose';
import connDb from '../../../utils/database.js';


const RiskProfileSchema = new mongoose.Schema(
	{
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
		ts_updated: {
			type: String,
			required: true,
			trim: true,
		},
		updated_by: {
			type: String,
			required: true,
			trim: true,
			maxLength: 24,
		},
	}
);

const RiskProfile = connDb.SiteCollections.model('risk_profile', RiskProfileSchema);

export default RiskProfile;