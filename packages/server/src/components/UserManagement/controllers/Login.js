import Users from "../models/Users.js";
import crypto from 'crypto';

export default async function Login(request, response){
    var {username, password} = request.body;
    
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

	password = crypto.createHash('sha512').update(password).digest('hex');

	try {
		await Users.findOne({
				$and: [ 
					{'user_info.username': username},
					{'user_info.password': password}
				] 
			}, (err, result) => {
			console.log(result);
			if (err) {
				return response
				.status(500)
        		.json({ message: "Fail", data: `Failed to login user: ${err}`});
			}
			if(!result) {
				return response
				.status(401)
				.json({ 
					message: "Fail",
					user_details: "Invalid username or password"
				});
			} else {
				return response
				.status(200)
				.json({ 
					message: "Success",
					user_details: {
						user_info: result.user_info,
						user_profile: result.user_profile
					},
					is_verified: result.is_verified,
					accounts_status: result.accounts_status
				});
			}
		})
	} catch(err) {
        console.log(err);
        return response
        .status(500)
        .json({ message: "Fail", data: `Failed to login user: ${err}`});
    };
}