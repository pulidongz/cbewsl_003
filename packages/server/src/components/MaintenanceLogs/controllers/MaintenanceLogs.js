import MaintenanceLogs from "../models/MaintenanceLogsModel.js";
import fs from "fs";
import FileUpload from "../../_Misc/FileUpload/FUModel.js";

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

    // ***Splitting Upsert Fxn to avoid overwriting existing files when updating.
    // Check if file exists on DB across all ML entry, then update.
    try {
        let ml_data = await MaintenanceLogs.findOneAndUpdate(
            // !! For now upserts only the data and a single file
            {_id: ml_id},
            // {$or: [ 
            //     {_id: ml_id},
            //     {'maintenance_files.originalname': file.originalname}
            // ]}, 
            { 
                //Update ML Data(Existing) and File(Existing)
                ...data,
                maintenance_files: [{...file}]
            },
            // { upsert: true },
            (err, foundMatch) =>{
                console.log("foundMatch", foundMatch);
                if (err) {
                    return response
                    .status(400)
                    .json({ message: "Fail", data: `Failed to update Maintenance Logs: ${err}` });
                }
                // If data does not exist, INSERT new ML data and file
                if (!foundMatch) {
                    console.log("Inserting new ML Data and File...");
                    let newMaintenanceLogs = new MaintenanceLogs({ 
                         ...data,
                         // $push: {maintenance_files: {...file}}
                        // maintenance_files: [{...file}]
                    });
                    newMaintenanceLogs.maintenance_files.push(file);
                    newMaintenanceLogs.save();
                }
                return response
                .status(200)
                .json({ 
                    message: "Success",
                });
            });
        console.log("ml_data", ml_data);
        // Delete old file from server
        // if(file && ml_data && file.originalname !== ml_data.maintenance_files.originalname){
        //     fs.unlink(`${ml_data.maintenance_files.path}`, 
        //     (err) => {
        //         if (err) console.log(err);
        //         else {
        //           console.log(`Successfully deleted ${ml_data.maintenance_files.originalname}`);}
        //         }
        //     );
        // }
        
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
            console.log("result", result);
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
            if(result){
                //Delete old file from server
                fs.unlink(`${result.maintenance_files[0].path}`, 
                (err) => {
                    if (err) console.log(err);
                    else {
                        console.log(`Successfully deleted ${result.maintenance_files[0].originalname}`);}
                    }
                );  
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