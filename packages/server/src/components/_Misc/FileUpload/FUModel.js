import mongoose from 'mongoose';
import connDb from '../../../utils/database.js';


const FileUploadSchema = new mongoose.Schema(
	{
        filename: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        originalname: {
            type: String,
            required: false,
            trim: true
        },
        mimetype: {
            type: String,
            required: true,
            trim: true,
        },
        path: {
            type: String,
            required: true,
            trim: true,
        },
        size: {
            type: Number,
            required: false,
            trim: true
        }, 
    },
	{
		timestamps: { 
			createdAt: 'ts_upload', 
			updatedAt: 'ts_update' 
		}
	},
);

const FileUpload = connDb.Commons.model('file_upload', FileUploadSchema);

export default FileUpload;