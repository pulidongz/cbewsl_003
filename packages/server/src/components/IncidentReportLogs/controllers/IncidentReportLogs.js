import IncidentReportLogs from "../models/IncidentReportLogsModel.js";
import fs from "fs";
import FileUpload from "../../_Misc/FileUpload/FUModel.js";

export async function FetchIncidentReportLogs(request, response) {
    const ml_id = request.params.id;
    try {
        await IncidentReportLogs.findById(ml_id)
        .exec(function(err, result){
            if (err) {
                return response
                .status(400)
                .json({ message: "Fail", data: "Please input a valid Incident Report Logs ID" });
            }
            if (!result) {
                return response
                .status(404)
                .json({ message: "Fail", data: "Incident Report Logs data does not exist" });
            }
            return response
            .status(200)
            .json({ message: "Success", data: result })
        });
    } catch(err) {
        console.log(err);
        return response
        .status(400)
        .json({ message: "Fail", data: `Failed to fetch Incident Report Logs data: ${err}`});
    };
}

export async function FetchAllIncidentReportLogs(request, response) {
    const site_id = request.params.site_id;
    try {
        await IncidentReportLogs.find(
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
                    message: "Fail", data: "Incident Report Logs data does not exist"
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
        .json({ message: "Fail", data: `Failed to fetch all Incident Report Logs data: ${err}`});
    };
}

export async function UpdateIncidentReportLogs(request, response) {
    const ml_id = request.params.id;
    const data = request.body;
    const file = request.file;

    // ***Splitting Upsert Fxn to avoid overwriting existing files when updating.
    // Check if file exists on DB across all ML entry, then update.
    try {
        let ml_data = await IncidentReportLogs.findOneAndUpdate(
            // !! For now upserts only the data and a single file
            {_id: ml_id},
            // {$or: [ 
            //     {_id: ml_id},
            //     {'incident_report_files.originalname': file.originalname}
            // ]}, 
            { 
                //Update ML Data(Existing) and File(Existing)
                ...data,
                incident_report_files: [{...file}]
            },
            // { upsert: true },
            (err, foundMatch) =>{
                console.log("foundMatch", foundMatch);
                if (err) {
                    return response
                    .status(400)
                    .json({ message: "Fail", data: `Failed to update Incident Report Logs: ${err}` });
                }
                // If data does not exist, INSERT new ML data and file
                if (!foundMatch) {
                    console.log("Inserting new ML Data and File...");
                    let newIncidentReportLogs = new IncidentReportLogs({ 
                         ...data,
                         // $push: {incident_report_files: {...file}}
                        // incident_report_files: [{...file}]
                    });
                    newIncidentReportLogs.incident_report_files.push(file);
                    newIncidentReportLogs.save();
                }
                return response
                .status(200)
                .json({ 
                    message: "Success",
                });
            });
        console.log("ml_data", ml_data);
        // Delete old file from server
        // if(file && ml_data && file.originalname !== ml_data.incident_report_files.originalname){
        //     fs.unlink(`${ml_data.incident_report_files.path}`, 
        //     (err) => {
        //         if (err) console.log(err);
        //         else {
        //           console.log(`Successfully deleted ${ml_data.incident_report_files.originalname}`);}
        //         }
        //     );
        // }
        
    } catch(err) {
        console.log(err);
        return response
        .status(500)
        .json({ message: "Fail", data: `Failed to update Incident Report Logs: ${err}`});
    };
}

export async function DeleteIncidentReportLogs(request, response) {
    const ml_id = request.params.id;
    try {
        await IncidentReportLogs.findByIdAndDelete(ml_id)
        .exec(function(err, result){
            console.log("result", result);
            if (err) {
                return response
                .status(400)
                .json({ message: "Fail", data: "Please input a valid Incident Report Logs ID" });
            }
            if (!result) {
                return response
                .status(404)
                .json({ message: "Fail", data: "Incident Report Logs data does not exist" });
            }
            if(result){
                //Delete old file from server
                fs.unlink(`${result.incident_report_files[0].path}`, 
                (err) => {
                    if (err) console.log(err);
                    else {
                        console.log(`Successfully deleted ${result.incident_report_files[0].originalname}`);}
                    }
                );  
            } 
            return response
            .status(200)
            .json({ message: "Success", data: "Incident Report Logs data deleted successfully" });
        });
    } catch(err) {
        console.log(err);
        return response
        .status(500)
        .json({ message: "Fail", data: `Failed to delete Incident Report Logs data: ${err}`});
    };
}