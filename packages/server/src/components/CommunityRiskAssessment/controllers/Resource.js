import mongoose from 'mongoose';
import Resource from '../models/ResourceModel.js';


export async function FetchResource(request, response){
    const resource_id = request.params.id;
    try {
        if(resource_id === "all"){
            await Resource.find({count:{$gt: 0}}, (err, result) => {
                if (err) {
                    return response
                    .status(400)
                    .json({ message: "Fail", data: err });
                }
                if (!result) {
                    return response
                    .status(404)
                    .json({
                        message: "Fail", data: "Resource data does not exist"
                    });
                }
                return response
                .status(200)
                .json({ message: "Success", data: result })
            })
        } else {
            await Resource.findById(resource_id, (err, result) => {
                if (err) {
                    return response
                    .status(400)
                    .json({ message: "Fail", data: err });
                }
                if (!result) {
                    return response
                    .status(404)
                    .json({ message: "Fail", data: "Resource data does not exist" });
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
        .json({ message: "Fail", data: `Failed to fetch all Resource data: ${err}`});
    };
}

export async function UpdateResource(request, response){
    const resource_id = request.params.id;
    const data = request.body;

    try {
        await Resource.findByIdAndUpdate(
            resource_id, 
            { ...data },
            (err, result) => {
            if (err) {
                return response
                .status(500)
                .json({ message: "Fail", data: "Failed to update Resource" });
            }
            if (!result) {
                let newResource = new Resource({ ...data });
				newResource.save();
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
        .json({ message: "Fail", data: `Failed to update Resource: ${err}`});
    };
}

export async function DeleteResource(request, response){
    const resource_id = request.params.id;
    try {
        await Resource.findByIdAndDelete(resource_id, (err, result) => {
            if (err) {
                return response
                .status(400)
                .json({ message: "Fail", data: `Failed to delete Resource data: ${err}`});
            }
            if (!result) {
                return response
                .status(404)
                .json({ message: "Fail", data: "Resource data does not exist" });
            }
            return response
            .status(200)
            .json({ message: "Success", data: "Resource data deleted successfully" });
        })
    } catch(err) {
        console.log(err);
        return response
        .status(400)
        .json({ message: "Fail", data: `Failed to delete Resource data: ${err}`});
    };
}