import multer from 'multer';
import path from 'path';
import { GridFsStorage } from 'multer-gridfs-storage';
// import connDb from '../../../utils/database';

//FILESYSTEM STORAGE
// const storage = new GridFsStorage({
//     db: connDb.Commons,
//     file: (req, file) => {
//         const match = [
//           'image/png', 
//           'image/jpeg', 
//           'application/pdf',
//           'application/msword',
//           'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//           'application/vnd.ms-excel',
//           'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//         ];

//       return {
//         filename: 'file_' + Date.now()
//       };
//     },
//     cache: true,
//   });

const uploadFolder = path.join(path.resolve("."), "src/uploads");

const upload = multer({ 
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, uploadFolder);
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 5000000 // max file size 5MB = 5000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

export default upload;