import { Router } from "express";
import { uploadPost } from "../controllers/uploadFiles.controller";
import { upload } from "../middlewares/uploadFile.middleware";

const router = Router();

router.post("/", upload, uploadPost);

export default router;
