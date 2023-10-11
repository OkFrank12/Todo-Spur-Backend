import streamifier from "streamifier";
import cloudinary from "../config/cloudinary";
export const streamUpload = (req: any) => {
  try {
    return new Promise(async (resolve, reject) => {
      const stream = await cloudinary.uploader.upload_stream((result, err) => {
        if (result) {
          return resolve(result);
        } else {
          return reject(err);
        }
      });
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  } catch (error) {
    console.log(error);
  }
};
