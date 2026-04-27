import { cloudinary } from "../lib/cloudinary.lib.js";

type UploadResult = {
  url: string;
  publicId: string;
};

export const uploadToCloudinary = (
  buffer: Buffer,
  folder = "profile",
): Promise<UploadResult> => {
  return new Promise<UploadResult>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: "image",
          transformation: [
            { width: 300, height: 300, crop: "fill", gravity: "face" },
          ],
        },
        (error: any, result: any) => {
          if (error || !result) return reject(error);
          resolve({ url: result.secure_url, publicId: result.public_id });
        },
      )
      .end(buffer);
  });
};
