import express, { Application } from "express";
import config from "../config";
import cors from "cors";

// routes imports
import routerUpload from "../routes/uploadFiles.routes";

class Server {
  private app: Application;
  private port: string;
  private path = {
    upload: "/upload",
  };

  constructor() {
    this.app = express();
    this.port = config.port as string;
    this.middlewares();
    this.routes();
    this.listen();
  }
  middlewares() {
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: "*",
        methods: "GET, POST, PUT, DELETE",
        preflightContinue: false,
        optionsSuccessStatus: 204,
      })
    );
  }
  routes(){
    this.app.use(this.path.upload, routerUpload);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default Server;
