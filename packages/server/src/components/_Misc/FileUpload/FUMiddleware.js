import multer from 'multer';
import path from 'path';

const uploadFolder = path.join(path.resolve("."), "src/uploads");
const maxFileSize = 5000000;

function FileUploadHandler(req, res, next) {
  const upload = multer({ 
    storage: multer.diskStorage({
      destination(req, file, callback) {
        callback(null, uploadFolder);
      },
      filename(req, file, callback) {
        // callback(null, `${new Date().getTime()}_${file.originalname}`);
        callback(null, `${file.originalname}`);
      }
    }),
    limits: {
      fileSize: maxFileSize
    },
    fileFilter(req, file, callback) {
      if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
        return callback(
          new Error(
            'Only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format'
          )
        );
      }
      // continue with upload
      callback(undefined, true);
    }
  }).array('file', 10);

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // FILE SIZE ERROR
      return res
      .status(400)
      .json({ message: "Fail", data: `Maximum file size is ${maxFileSize}MB`});
    } else if (err) {
      // INVALID FILE TYPE, message will return from fileFilter callback
      return res
      .status(400)
      .json({ message: "Fail", data: `${err}`});
    }
    // Everything went fine. 
    next()
  })
}

export default FileUploadHandler;

// export default upload;