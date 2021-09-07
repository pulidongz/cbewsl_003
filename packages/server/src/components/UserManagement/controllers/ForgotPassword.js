import Users from "../models/Users.js";
import otpGenerator from 'otp-generator';

export default async function ForgotPassword(request, response){
  const {username, mobile_number} = request.body;

	const generate_otp = otpGenerator.generate(12, { upperCase: false, specialChars: false });

	if(!username && !mobile_number){
		return response
		.status(400)
		.json({
			message: "Fail",
			user_details: "Username or Mobile Number not provided"
		});
	}
	try {
		await Users.findOne({
			$or: [
				{'user_info.username': username},
				{'user_info.mobile_number': mobile_number}
			]},
			(err, result) => {
				if (err) {
					return response
					.status(500)
					.json({ message: "Fail", data: `Error: ${err}`});
				}

				//Provide new OTP code
				result.otp_code = generate_otp;
				result.save((err) => {
					if (err) {
						return response
						.status(500)
						.json({ message: "Fail", data: `Error: ${err}`});
					} 
					return response
					.status(200)
					.json({
						message: "Success"
					});
				});
			// TODO: Send OTP verification code fxn to user via SMS for password reset
				
			})
	} catch(err) {
		console.log(err);
		return response
		.status(500)
		.json({ message: "Fail", data: `Error: ${err}`});
	};
}