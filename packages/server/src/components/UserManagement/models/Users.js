import mongoose from 'mongoose';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Schema = mongoose.Schema;

const UsersSchema = new Schema(
	{
		user_info: {
			username: {
				type: String,
				required: true,
				trim: true,
				unique: true
			},
			password: {
				type: String,
				required: true,
				trim: true,
			},
			mobile_number: {
				type: String,
				required: true,
				trim: true,
				maxLength: 11,
			},
			firstname: {
				type: String,
				required: false,
				trim: true
			},
			lastname: {
				type: String,
				required: false,
				trim: true
			},
		},
		user_profile: {
			gender: {
				type: String,
				required: false,
				trim: true
			},
			site: {
				type: String,
				required: false,
				trim: true
			},
			role:  {
				type: String,
				required: false,
				trim: true
			},
			birthdate: {
				type: String,
				required: false,
				trim: true
			},
			salutation: {
				type: String,
				required: false,
				trim: true
			},
			suffix: {
				type: String,
				required: false,
				trim: true
			},
			full_address: {
				type: String,
				required: false,
				trim: true
			},
			street: {
				type: String,
				required: false,
				trim: true
			},
			barangay: {
				type: String,
				required: false,
				trim: true
			},
			municipality: {
				type: String,
				required: false,
				trim: true
			},
			city: {
				type: String,
				required: false,
				trim: true
			},
			country: {
				type: String,
				required: false,
				trim: true
			}
		},
		is_verified: {
			type: Boolean,
			required: true,
		},
		accounts_status: {
			type: String,
			required: true,
		},
		otp_code: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);

const Users = mongoose.model('users',UsersSchema);

export default Users;