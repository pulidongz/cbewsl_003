import Users from "../models/Users.js";
import crypto from 'crypto';
import otpGenerator from 'otp-generator';


export default async function Register(request, response){
	var {username, password, mobile_number} = request.body;

	const generate_otp = otpGenerator.generate(12, { upperCase: false, specialChars: false });
	
	//TODO: Add more field validation
	if(!username){
		return response
		.status(400)
		.json({
			message: "Fail",
			user_details: "Username not provided"
		});
	}
	if(!password){
		return response
		.status(400)
		.json({
			message: "Fail",
			user_details: "Password not provided"
		});
	}
	if(!mobile_number){
		return response
		.status(400)
		.json({
			message: "Fail",
			user_details: "Mobile number not provided"
		});
	}

	password = crypto.createHash('sha512').update(password).digest('hex');

	// Check if credentials already exist
	await Users.findOne({
		$and: [
			{'user_info.username': username.toLowerCase()},
			{'user_info.password': password}
		]},
		(err, result) => {
			if (err) {
				return response
				.status(500)
				.json({ message: "Fail", error: err });
			}
			if(result) {
				// User already exists
				return response
				.status(403)
				.json({ 
					message: "Fail",
					user_details: "Username / Mobile Number already exists"
				});
			} 
			// Create new user
			try {
				let newUser = new Users({
					user_info:	{
						username: username,
						password: password,
						mobile_number: mobile_number,
					},
					is_verified: false,
					accounts_status: "active",
					otp_code: generate_otp,
				});
				newUser.save();
				// TODO: Send OTP verification code fxn to user via SMS

				return response
				.status(202)
				.json({ 
					message: "Success",
					user_details: "Account successfully created"
				});
			} catch (error) {
				return response
				.status(500)
				.json({
					message: "Fail",
					error: err
				});
			}
	}).catch(err => console.log(err));;
}