import FileUpload from "./FUModel.js";
import fs from "fs";

// TODO: File Upload Get
export async function FUGet(req, res) {}

// TODO: File Upload Upsert
export async function FUUpsert(req) {
    const fileIds = [];

    for (const file of req.files) {
        let tempId = await FileUpload.findOneAndUpdate(
            { 
                originalname: file.originalname
            },
            { ...file },
            { 
                upsert: true, 
                new: true 
            },
            (err, newFile) =>{
                if (err) {
                    return response
                    .status(400)
                    .json({ message: "Fail", data: `Failed to upsert current file: ${err}` });
                }
            });
            fileIds.push(tempId);
    }

    return fileIds;
}

export async function FileCleanup(req, res) {
    const fileIds = req.body.fileIds;
    const fileIdsArray = fileIds.split(",");
    const fileIdsArrayInt = fileIdsArray.map(Number);
    const files = await FileUpload.find({
        _id: { $in: fileIdsArrayInt }
    });
    console.log("FILES: ", files);
    for (const file of files) {
        fs.unlink(`${file.path}`, (err) => {
            if (err) {
                console.log("Error deleting file", err);
            }
            console.log(`${file.path} was deleted`);
        });
    }
    await FileUpload.deleteMany({
        _id: { $in: fileIdsArrayInt }
    });
    return "Success";
}

// TODO: File Upload Delete
export async function FUDelete(req, res) {}