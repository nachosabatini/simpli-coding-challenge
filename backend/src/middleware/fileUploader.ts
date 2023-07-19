import multer from 'multer';
import { Request } from 'express';

const fileUploader = () => {
  const storage = multer.memoryStorage();

  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    console.log(file);

    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  };

  const upload = multer({ storage, fileFilter });

  return upload;
};

export default fileUploader;
