import multer, { FileFilterCallback } from "multer";
import crypto from "crypto";
import { Request, Response, NextFunction } from "express";
import path from "path";

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/uploads"),
  filename: function (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) {
    const uuid = crypto.randomUUID();
    cb(
      null,
      uuid + file.originalname.substring(file.originalname.lastIndexOf("."))
    );
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const fileTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
  if (fileTypes.some((fileType) => fileType === file.mimetype)) {
    cb(null, true);
  }
  return cb(null, false);
};

const maxSize = 5 * 1024 * 1024;

export const upload = (req: Request, res: Response, next: NextFunction) => {
  return multer({
    storage,
    limits: { fileSize: maxSize },
    fileFilter,
  }).single("image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: "Max file size5MB Allowed" });
    }
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }
    next();
  });
};
