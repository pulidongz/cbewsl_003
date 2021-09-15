import HazardMap from '../models/HazardMapModel.js';


export async function FetchAllHazardMap(request, response){
    const site_id = request.params.site_id;
    try {
        await HazardMap.find({site_id: site_id})
        // .populate('uploaded_by')
        .exec(function(err, result){
            if (err) {
                return response
                .status(400)
                .json({ message: "Fail", data: "Please input a valid Hazard Map ID" });
            }
            if (!result) {
                return response
                .status(404)
                .json({
                    message: "Fail", data: "Hazard Map data does not exist"
                });
            }
            return response
            .status(200)
            .json({ message: "Success", data: result })
        });
    } 
    catch(err) {
        console.log(err);
        return response
        .status(500)
        .json({ message: "Fail", data: `Failed to fetch Hazard Map: ${err}`});
    };
}

export async function UploadHazardMap(request, response){
    const data = request.body;

    try {
        await HazardMap.findOneAndUpdate(
            { filename: data.filename },
            { ...data },
            { upsert: true })
            .exec(function(err, result){
                if (err) {
                    return response
                    .status(400)
                    .json({ message: "Fail", data: "Please input a valid Hazard Map ID" });
                }
                return response
                .status(200)
                .json({ 
                    message: "Success",
                });
            });
    } catch (err) {
        console.log(err);
        return response
        .status(500)
        .json({ message: "Fail", data: `Failed to upload Hazard Map: ${err}`});
    }
}

export async function DeleteHazardMap(request, response){
    const hm_id = request.params.id;
    try {
        await HazardMap.findByIdAndDelete(hm_id)
        .exec(function(err, result){
            if (err) {
                return response
                .status(400)
        .json({ message: "Fail", data: "Please input a valid Hazard Map ID" });
            }
            if (!result) {
                return response
                .status(404)
                .json({ message: "Fail", data: "Hazard Map does not exist" });
            }
            return response
            .status(200)
            .json({ message: "Success", data: "Hazard Map data deleted successfully" });
        });
    } catch(err) {
        console.log(err);
        return response
        .status(500)
        .json({ message: "Fail", data: `Failed to delete Hazard Map: ${err}`});
    };
}