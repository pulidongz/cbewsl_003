import IncidentReportLogs from "../models/IncidentReportLogsModel.js";
import fs from "fs";
import { FUUpsert } from "../../_Misc/FileUpload/FUController.js";
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
        .populate('incident_report_files')
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
    const file = request.files;

    // Upsert files to DB and upload file(s) to server
    let fileIds = await FUUpsert(request);

    // Upsert data to DB and replace "incident_report_files" array
    // with objectIDs obtained from fileIds
    try {
        await IncidentReportLogs.findOneAndUpdate(
            {_id: ml_id },
            { 
                ...data,
                incident_report_files: fileIds
            },
            { upsert: true },
            (err) =>{
                if (err) {
                    return response
                    .status(400)
                    .json({ message: "Fail", data: `Failed to update Incident Report Logs: ${err}` });
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
        .json({ message: "Fail", data: `Failed to update Incident Report Logs: ${err}`});
    };
}

export async function DeleteIncidentReportLogs(request, response) {
    const ml_id = request.params.id;
    try {
        await IncidentReportLogs.findByIdAndDelete(ml_id)
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
            .json({ message: "Success", data: "Incident Report Logs data deleted successfully" });
        });
    } catch(err) {
        console.log(err);
        return response
        .status(500)
        .json({ message: "Fail", data: `Failed to delete Incident Report Logs data: ${err}`});
    };
}