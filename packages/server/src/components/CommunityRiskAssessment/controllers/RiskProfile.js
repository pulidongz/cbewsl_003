import RiskProfile from '../models/RiskProfileModel.js';


export async function FetchRiskProfile(request, response){
    const rp_id = request.params.id;
    try {
        await RiskProfile.findById(rp_id)
        // .populate('updated_by')
        .exec(function(err, result){
            if (err) {
                return response
                .status(400)
                .json({ message: "Fail", data: "Please input a valid Risk Profile ID" });
            }
            if (!result) {
                return response
                .status(404)
                .json({ message: "Fail", data: "Risk Profile data does not exist" });
            }
            return response
            .status(200)
            .json({ message: "Success", data: result })
        }); 
    } catch(err) {
        console.log(err);
        return response
        .status(500)
        .json({ message: "Fail", data: `Failed to fetch Risk Profile data: ${err}`});
    };
}

export async function FetchAllRiskProfile(request, response){
    const site_id = request.params.site_id;
    try {
        await RiskProfile.find(
            {
                $and:[
                    {site_id: site_id},
                    {risk_count:{$gt: 0}}
                ]
            })
            // .populate('updated_by')
            .exec(function(err, result){
                if (err) {
                    return response
                    .status(400)
                    .json({ message: "Fail", data: "Please input a valid Risk Profile ID" });
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
            });
    } catch(err) {
        console.log(err);
        return response
        .status(500)
        .json({ message: "Fail", data: `Failed to fetch Risk Profile data: ${err}`});
    };
}

export async function UpdateRiskProfile(request, response){
    const rp_id = request.params.id;
    const data = request.body;

    try {
        await RiskProfile.findByIdAndUpdate(
            rp_id, 
            { ...data })
            .exec(function(err, result){
                if (err) {
                    return response
                    .status(400)
                    .json({ message: "Fail", data: "Please input a valid Risk Profile ID" });
                }
                if (!result) {
                    let newRiskProfile = new RiskProfile({ ...data });
                    newRiskProfile.save();
                }
                return response
                .status(200)
                .json({ 
                    message: "Success",
                });
            });
    } catch(err) {
        console.log(err);
        return response
        .status(500)
        .json({ mssage: "Fail", data: `Failed to update Risk Profile data: ${err}`});
    };
}

export async function DeleteRiskProfile(request, response){
    const rp_id = request.params.id;
    try {
        await RiskProfile.findByIdAndDelete(rp_id)
        .exec(function(err, result){
            if (err) {
                return response
                .status(400)
                .json({ message: "Fail", data: "Please input a valid Risk Profile ID" });
            }
            if (!result) {
                return response
                .status(404)
                .json({ message: "Fail", data: "Risk Profile data does not exist" });
            }
            return response
            .status(200)
            .json({ message: "Success", data: "Risk Profile data deleted successfully" });
        });
    } catch(err) {
        console.log(err);
        return response
        .status(500)
        .json({ message: "Fail", data: `Failed to delete Risk Profile data: ${err}`});
    };
}