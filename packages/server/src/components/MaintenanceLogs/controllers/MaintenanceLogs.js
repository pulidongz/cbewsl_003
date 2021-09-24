import MaintenanceLogs from "../models/MaintenanceLogsModel.js";
import { FUUpsert } from "../../_Misc/FileUpload/FUController.js";


export async function FetchMaintenanceLogs(request, response) {
    const ml_id = request.params.id;
    try {
        await MaintenanceLogs.findById(ml_id)
        .exec(function(err, result){
            if (err) {
                return response
                .status(400)
                .json({ message: "Fail", data: "Please input a valid Maintenance Logs ID" });
            }
            if (!result) {
                return response
                .status(404)
                .json({ message: "Fail", data: "Maintenance Logs data does not exist" });
            }
            return response
            .status(200)
            .json({ message: "Success", data: result })
        });
    } catch(err) {
        console.log(err);
        return response
        .status(400)
        .json({ message: "Fail", data: `Failed to fetch Maintenance Logs data: ${err}`});
    };
}

export async function FetchAllMaintenanceLogs(request, response) {
    const site_id = request.params.site_id;
    try {
        await MaintenanceLogs.find(
            { 
                site_id: site_id     
            })
        .populate('maintenance_files')
        .exec(function(err, result){
            if (err) {
                console.log(err);
                return response
                .status(400)
                .json({ message: "Fail", data: "Please input a valid Site ID" });
            }
            if (!result) {
                return response
                .status(404)
                .json({
                    message: "Fail", data: "Maintenance Logs data does not exist"
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
        .json({ message: "Fail", data: `Failed to fetch all Maintenance Logs data: ${err}`});
    };
}

export async function UpdateMaintenanceLogs(request, response) {
    const ml_id = request.params.id;
    const data = request.body;
    const file = request.file;

    // Upsert files to DB and upload file(s) to server
    let fileIds = await FUUpsert(request);

    // Upsert data to DB and replace "maintenance_files" array
    // with objectIDs obtained from fileIds
    try {
        await MaintenanceLogs.findOneAndUpdate(
            { _id: ml_id },
            { 
                ...data,
                maintenance_files: fileIds
            },
            { upsert: true },
            (err) =>{
                if (err) {
                    return response
                    .status(400)
                    .json({ message: "Fail", data: `Failed to update Maintenance Logs: ${err}` });
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
        .json({ message: "Fail", data: `Failed to update Maintenance Logs: ${err}`});
    };
}

export async function DeleteMaintenanceLogs(request, response) {
    const ml_id = request.params.id;
    try {
        await MaintenanceLogs.findByIdAndDelete(ml_id)
        .exec(function(err, result){
            if (err) {
                return response
                .status(400)
                .json({ message: "Fail", data: "Please input a valid Maintenance Logs ID" });
            }
            if (!result) {
                return response
                .status(404)
                .json({ message: "Fail", data: "Maintenance Logs data does not exist" });
            }
            return response
            .status(200)
            .json({ message: "Success", data: "Maintenance Logs data deleted successfully" });
        });
    } catch(err) {
        console.log(err);
        return response
        .status(500)
        .json({ message: "Fail", data: `Failed to delete Maintenance Logs data: ${err}`});
    };
}