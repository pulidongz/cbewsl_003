import Users from "../models/Users.js";
import crypto from 'crypto';

export default async function Verify(request, response){
  const {user_id, otp_code} = request.body;

	await Users.findById(user_id, (err, result) => {
		if (err) {
			return response
			.status(500)
			.json({ message: "Fail", error: err });
		}
		if (!result) {
			return response
			.status(404)
			.json({
				message: "Fail",
				user_details: "User not found / does not exist"
			});
		}
		// Check if otp_code = otp_code in db
		if (result.otp_code === otp_code) {
			// Find and delete the otp_code from db
			result.otp_code = null;
			result.is_verified = true;
			result.save((err) => {
				if (err) {
					return response
					.status(500)
					.json({ message: "Fail", error: err });
				}
				return response
				.status(200)
				.json({
					message: "Success",
					user_details: {
						user_info: result.user_info,
						user_profile: result.user_profile
					}
				});
			});
		} else {
			return response
			.status(400)
			.json({
				message: "Fail",
				user_details: "OTP code is incorrect"
			});
		}
	}).catch(err => console.log(err));
}