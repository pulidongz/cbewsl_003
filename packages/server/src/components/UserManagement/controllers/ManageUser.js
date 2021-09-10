import Users from "../models/Users.js";
import crypto from 'crypto';

export async function UpdateUserInfo(request, response){
	const data = request.body;

	if(!data.user_id || !data.username || !data.password ||
		!data.mobile_number || !data.firstname || !data.lastname){
		return response
		.status(400)
		.json({
			message: "Fail",
			user_details: "Error missing fields"
		});
	}
	data.password = crypto.createHash('sha512').update(data.password).digest('hex');
	try {
		await Users.findByIdAndUpdate(data.user_id,
			{
				user_info: { ...data }
			},
			{
				new: true
			},
			(err, result) => {
			if (err) {
				return response
				.status(500)
        		.json({ message: "Fail", data: `Failed to fetch user details ${err}`});
			}
			return response
			.status(200)
			.json({ 
				message: "Success",
				user_info: result.user_info
			});
			
		})
	} catch(err) {
		console.log(err);
        return response
        .status(500)
        .json({ message: "Fail", data: `Failed to fetch user details ${err}`});
	};
}

export async function UpdateUserProfile(request, response){
	const data = request.body;

	if(!data.user_id){
		return response
		.status(400)
		.json({
			message: "Fail",
			user_details: "Error missing User ID"
		});
	}
	try{
		await Users.findByIdAndUpdate(
			data.user_id,
			{
				user_profile: { ...data }
			},
			{
				new: true
			},
			(err, result) => {
			if (err) {
				return response
				.status(500)
        		.json({ message: "Fail", data: `Failed to fetch user details ${err}`});
			}
			return response
			.status(200)
			.json({ 
				message: "Success",
				user_profile: result.user_profile
			});
		})
	} catch(err) {
		console.log(err);
        return response
        .status(500)
        .json({ message: "Fail", data: `Failed to fetch user details ${err}` });
	};
}

export async function RevokeUser(request, response){
	const user_id = request.params.user_id;
	try {
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
		})
	} catch(err) {
		console.log(err);
        return response
        .status(500)
        .json({ message: "Fail", data: `Failed to fetch user details ${err}`});
	};
}

export async function SuspendUser(request, response){
	const user_id = request.params.user_id;
	try {
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
		})
	} catch(err) {
		console.log(err);
        return response
        .status(500)
        .json({ message: "Fail", data: `Failed to fetch user details ${err}`});
	};
}

export async function ResumeUser(request, response){
	const user_id = request.params.user_id;
	try {
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
		}) 
	} catch(err) {
		console.log(err);
        return response
        .status(500)
        .json({ message: "Fail", data: `Failed to fetch user details ${err}`});
	};
}

export async function FetchUserDetails(request, response){
	const user_id = request.params.user_id;
	try {
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
					user_details: "User not found or does not exist"
				});
			}
			return response
			.status(200)
			.json({ message: "Success", user_details: result })
		})
	} catch(err) {
		console.log(err);
        return response
        .status(400)
        .json({ message: "Fail", data: `Failed to fetch user details ${err}`});
	};
}