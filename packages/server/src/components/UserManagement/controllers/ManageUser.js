import Users from "../models/Users.js";
import crypto from 'crypto';

export async function UpdateUserInfo(request, response){
	var {user_id, username, password, mobile_number, firstname, lastname} = request.body;

	//TODO: Add field validation
	if(!user_id || !username || !password || !mobile_number || !firstname || !lastname){
		return response
		.status(400)
		.json({
			message: "Fail",
			user_details: "Error missing fields"
		});
	}

	password = crypto.createHash('sha512').update(password).digest('hex');
	await Users.findById(user_id, (err, result) => {
		console.log(result);
		if (err) {
			return response
			.status(500)
			.json({ message: "Fail", error: err });
		}
		//Update user_info
		result.user_info.username = username;
		result.user_info.password = password;
		result.user_info.mobile_number = mobile_number;
		result.user_info.firstname = firstname;
		result.user_info.lastname = lastname;
		result.save((err, resp) => {
			if (err) {
				return response
				.status(500)
				.json({ message: "Fail", error: err });
			}
			return response
			.status(200)
			.json({ 
				message: "Success",
				user_info: resp.user_info
			});
		});
	}).catch(err => console.log(err));
}

export async function UpdateUserProfile(request, response){
	var {user_id, gender, site, role, birthdate, salutation, suffix, full_address, street, barangay, municipality, city, country} = request.body;

	//TODO: Add field validation
	if(!user_id){
		return response
		.status(400)
		.json({
			message: "Fail",
			user_details: "Error missing User ID"
		});
	}
	await Users.findById(user_id, (err, result) => {
		console.log(result);
		if (err) {
			return response
			.status(500)
			.json({ message: "Fail", error: err });
		}
		//Update user_profile
		result.user_profile.gender = gender
		result.user_profile.site = site
		result.user_profile.role = role
		result.user_profile.birthdate = birthdate
		result.user_profile.salutation = salutation
		result.user_profile.suffix = suffix
		result.user_profile.full_address = full_address
		result.user_profile.street = street
		result.user_profile.barangay = barangay
		result.user_profile.municipality = municipality
		result.user_profile.city = city
		result.user_profile.country = country
		result.save((err, resp) => {
			if (err) {
				return response
				.status(500)
				.json({ message: "Fail", error: err });
			}
			return response
			.status(200)
			.json({ 
				message: "Success",
				user_profile: resp.user_profile
			});
		});
	}).catch(err => console.log(err));

}

export async function RevokeUser(request, response){
	const user_id = request.params.user_id;
	await Users.findById(user_id, (err, result) => {
		if (err) {
			return response
				.status(400)
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
		result.accounts_status = "revoked";
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
			});
		});
	}).catch(err => console.log(err));
}

export async function SuspendUser(request, response){
	const user_id = request.params.user_id;
	await Users.findById(user_id, (err, result) => {
		if (err) {
			return response
				.status(400)
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
		result.accounts_status = "suspend";
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
			});
		});
	}).catch(err => console.log(err));
}

export async function ResumeUser(request, response){
	const user_id = request.params.user_id;
	await Users.findById(user_id, (err, result) => {
		if (err) {
			return response
				.status(400)
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
		result.accounts_status = "active";
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
			});
		});
	}).catch(err => console.log(err));
}

export async function FetchUserDetails(request, response){
	const user_id = request.params.user_id;
	await Users.findById(user_id, (err, result) => {
		if (err) {
			return response
				.status(400)
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
		return response
			.status(200)
			.json({ message: "Success", user_details: result })
	}).catch(err => console.log(err));
}