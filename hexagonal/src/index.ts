import express, { Request, Response } from "express";
import { setupTopicHTTPModule } from "./topic/module";
import morgan from "morgan";

const port = process.env.PORT || 3000;
const app = express();

//We have to tell express to use json
//so express can understand and return correct data
app.use(express.json());
app.use(morgan("combined"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/v1", setupTopicHTTPModule());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
