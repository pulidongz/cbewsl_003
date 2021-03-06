import mongoose from 'mongoose';
import Resource from '../models/ResourceModel.js';


export async function FetchResource(request, response){
    const resource_id = request.params.id;
    try {
        await Resource.findById(resource_id)
        // .populate('updated_by')
        .exec(function(err, result){
            if (err) {
                return response
                .status(400)
                .json({ message: "Fail", data: "Please input a valid Resource ID" });
            }
            if (!result) {
                return response
                .status(404)
                .json({ message: "Fail", data: "Resource data does not exist" });
            }
            return response
            .status(200)
            .json({ message: "Success", data: result })
        });
    } catch(err) {
        console.log(err);
        return response
        .status(500)
        .json({ message: "Fail", data: `Failed to fetch Resource data: ${err}`});
    };
}

export async function FetchAllResource(request, response){
    const site_id = request.params.site_id;
    try {
        await Resource.find(
            {
                $and:[
                    {site_id: site_id},
                    {count:{$gt: 0}}
                ]
            })
        // .populate('updated_by')
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
                    message: "Fail", data: "Resource data does not exist"
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
        .json({ message: "Fail", data: `Failed to fetch all Resource data: ${err}`});
    };
}

export async function UpdateResource(request, response){
    const resource_id = request.params.id;
    const data = request.body;

    try {
        await Resource.findByIdAndUpdate(
            resource_id, 
            { ...data })
            .exec(function(err, result){
                if (err) {
                    return response
                    .status(400)
                    .json({ message: "Fail", data: "Please input a valid Resource ID" });
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
            });
    } catch(err) {
        console.log(err);
        return response
        .status(500)
        .json({ message: "Fail", data: `Failed to update Resource: ${err}`});
    };
}

export async function DeleteResource(request, response){
    const resource_id = request.params.id;
    try {
        await Resource.findByIdAndDelete(resource_id)
        .exec(function(err, result){
            if (err) {
                return response
                .status(400)
                .json({ message: "Fail", data: "Please input a valid Resource ID" });
            }
            if (!result) {
                return response
                .status(404)
                .json({ message: "Fail", data: "Resource data does not exist" });
            }   
            return response
            .status(200)
            .json({ message: "Success", data: "Resource data deleted successfully" });
        });
    } catch(err) {
        console.log(err);
        return response
        .status(500)
        .json({ message: "Fail", data: `Failed to delete Resource data: ${err}`});
    };
}