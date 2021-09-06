import HazardMap from '../models/HazardMapModel.js';

export async function FetchAllHazardMap(request, response){
    try {
        await HazardMap.find({}, (err, result) => {
            if (err) {
                return response
                .status(400)
                .json({ message: "Fail", data: `Failed to fetch Hazard Map data: ${err}`});
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
        })
    } 
    catch(err) {
        console.log(err);
        return response
        .status(400)
        .json({ message: "Fail", data: `Failed to fetch Hazard Map data: ${err}`});
    };
}

export async function DeleteHazardMap(request, response){
    const hm_id = request.params.id;
    try {
        await HazardMap.findByIdAndDelete(hm_id, (err, result) => {
            if (err) {
                return response
                .status(400)
        .json({ message: "Fail", data: `Failed to delete Hazard Map data: ${err}`});
            }
            if (!result) {
                return response
                .status(404)
                .json({ message: "Fail", data: "Hazard Map data does not exist" });
            }
            return response
            .status(200)
            .json({ message: "Success", data: "Hazard Map data deleted successfully" });
        })
    } catch(err) {
        console.log(err);
        return response
        .status(400)
        .json({ message: "Fail", data: `Failed to delete Hazard Map data: ${err}`});
    };
}

export async function UploadHazardMap(request, response){

}