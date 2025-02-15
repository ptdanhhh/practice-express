import express, { Request, Response } from "express";
import morgan from "morgan";
import { sequelize } from "./share/component/sequelize";
import { appConfig } from "./share/component/env.config";
import { setupTopicHTTPModule } from "./modules/topic/module";

async function startServer() {
  const port = appConfig.port;
  const app = express();

  //We have to tell express to use json
  //so express can understand and return correct data
  app.use(express.json());
  app.use(morgan("combined"));

  await sequelize.authenticate();
  console.log("DB connection success");

  app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
  });

  app.use("/v1", setupTopicHTTPModule());

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();
