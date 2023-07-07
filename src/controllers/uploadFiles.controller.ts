import { Request, Response } from "express";

export const uploadPost = (req: Request, res: Response) => {
  res.status(201).json({
    message: "File uploaded successfully",
    file: req.file as Express.Multer.File,
  });
};
