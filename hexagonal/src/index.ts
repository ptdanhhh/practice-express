import express, { Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { setupTopicHTTPModule } from "./topic/module";

dotenv.config();
const port = process.env.PORT;
const app = express();

//We have to tell express to use json
//so express can understand and return correct data
app.use(express.json());
app.use(morgan("combined")); //Http logging

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/v1", setupTopicHTTPModule());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
