import Users from "../models/Users.js";
import otpGenerator from 'otp-generator';

export default async function SendOTP(request, response){
  const {user_id} = request.body;

	const generate_otp = otpGenerator.generate(12, { upperCase: false, specialChars: false });

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
		// Update Users with the new OTP code
		result.otp_code = generate_otp;
		result.save((err) => {
			if (err) {
				return response
				.status(500)
				.json({ message: "Fail", error: err });
			} 
			return response
			.status(200)
			.json({
				message: "Success"
			});
		});
		// TODO: Send OTP verification code fxn to user via SMS

	}).catch(err => console.log(err));
}