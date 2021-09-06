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
    var {resource, count, ts_updated, updated_by} = request.body;
    try {
        await Resource.findByIdAndUpdate(
            resource_id, 
            {
                $set:{
                    resource: resource,
                    count: count,
                    ts_updated: ts_updated,
                    updated_by: updated_by,
                },
                // $setOnInsert: {
                //     _id:  new mongoose.Types.ObjectId()
                // }
            },
            {
                upsert: true
            },
            (err, result) => {
            if (err) {
                return response
                .status(500)
                .json({ message: "Fail", data: "Failed to update Resource" });
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