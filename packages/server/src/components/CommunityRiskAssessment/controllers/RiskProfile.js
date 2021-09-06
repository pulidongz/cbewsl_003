import RiskProfile from '../models/RiskProfileModel.js';

export async function FetchRiskProfile(request, response){
    const rp_id = request.params.id;
    try {
        if(rp_id === "all"){
            await RiskProfile.find({risk_count:{$gt: 0}}, (err, result) => {
                if (err) {
                    return response
                    .status(400)
                    .json({ message: "Fail", data: `Failed to fetch Risk Profile data: ${err}`});
                }
                if (!result) {
                    return response
                    .status(404)
                    .json({
                        message: "Fail", data: "Risk Profile data does not exist"
                    });
                }
                return response
                .status(200)
                .json({ message: "Success", data: result })
            })
        } else {
            await RiskProfile.findById(rp_id, (err, result) => {
                if (err) {
                    return response
                    .status(400)
                    .json({ message: "Fail", data: err });
                }
                if (!result) {
                    return response
                    .status(404)
                    .json({ message: "Fail", data: "Risk Profile data does not exist" });
                }
                return response
                .status(200)
                .json({ message: "Success", data: result })
            })
        }   
    } 
    catch(err) {
        console.log(err);
        return response
        .status(400)
        .json({ message: "Fail", data: `Failed to fetch Risk Profile data: ${err}`});
    };
}

export async function UpdateRiskProfile(request, response){
    const rp_id = request.params.id;
    var {profile, risk_count, designee, risk_type, ts_updated, updated_by} = request.body;
    try {
        await RiskProfile.findByIdAndUpdate(
            rp_id, 
            {
                $set:{
                    profile: profile,
                    risk_count: risk_count,
                    designee: designee,
                    risk_type: risk_type,
                    ts_updated: ts_updated,
                    updated_by: updated_by,
                },
                // $setOnInsert: {
                //     _id:  new mongoose.Types.ObjectId()
                // }
            },
            {
                upsert: true
            },
            (err, result) => {
            if (err) {
                return response
                .status(500)
                .json({ message: "Fail", data: "Failed to update Risk Profile data" });
            }
            return response
            .status(200)
            .json({ 
                message: "Success",
            });
    	})
    } catch(err) {
        console.log(err);
        return response
        .status(400)
        .json({ message: "Fail", data: `Failed to update Risk Profile data: ${err}`});
    };
}

export async function DeleteRiskProfile(request, response){
    const rp_id = request.params.id;
    try {
        await RiskProfile.findByIdAndDelete(rp_id, (err, result) => {
            if (err) {
                return response
                .status(400)
                .json({ message: "Fail", data: "Failed to delete Risk Profile data" });
            }
            if (!result) {
                return response
                .status(404)
                .json({ message: "Fail", data: "Risk Profile data does not exist" });
            }
            return response
            .status(200)
            .json({ message: "Success", data: "Risk Profile data deleted successfully" });
        })
    } catch(err) {
        console.log(err);
        return response
        .status(400)
        .json({ message: "Fail", data: `Failed to delete Risk Profile data: ${err}`});
    };
}