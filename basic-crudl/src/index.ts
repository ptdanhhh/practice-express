import express, { Request, Response } from "express";
import { v7 } from "uuid";

const port = process.env.PORT || 3000;
const app = express();

//We have to tell express to use json
//so express can understand and return correct data
app.use(express.json());

//Request and Response doesn't need to be here
//But it better to be declared it because we doing TS here
//For more straight-foward
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

//CRUDL - Create, Read, Update, Delete, List

//REST API Convention
//POST /topics (create new topics) - Create
//GET /topics/:id (get topic by id) - Read
//PATCH /topics/:id (update topic by id) - Update
//DELETE /topics/:id (delete topic by id) - Delete
//GET /users (list topics) - List

//RPC-based API
//Authentication (login)
//Register (create new user)

//HTTPS Status Code
//2xx - Success
//200 OK
//201 Created
//204 No Content
//4xx - Client Error
//400 Bad Request
//401 Unauthorized
//403 Forbidden
//404 Not Found
//5xx - Server Error
//500 Internal Server Error

//Declare a type for topic
type Topic = {
  id: string;
  name: string;
  color: string;
  postCount: number;
  createdAt: Date;
  updatedAt: Date;
};

//Default array of Topic value
var topics: Topic[] = [
  {
    id: "019471b5-7c7c-7293-986f-c0f06ee0c7a5",
    name: "General",
    color: "Blue",
    postCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "019471b8-f9f4-778b-b520-7d4ef7f6be23",
    name: "Classical",
    color: "Cyan",
    postCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

//Create
app.post("/v1/topics", (req: Request, res: Response) => {
  const newTopic: Topic = {
    id: v7(),
    ...req.body,
    postCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  //After create a newTopic push it to topics array
  topics.push(newTopic);
  res.status(201).json({ data: newTopic.id });
});

//Read
app.get("/v1/topics/:id", (req: Request, res: Response) => {
  const { id } = req.params; // This to get the :id value

  const topicById = topics.find((topic) => topic.id === id); // find  topic with id

  if (!topicById) {
    res.status(404).json({ error: "Topic not found" });
    return;
  }

  res.status(200).json({ data: topicById });
});

//Update
app.patch("/v1/topics/:id", (req: Request, res: Response) => {
  //Find topic first if not return error
  const { id } = req.params; // This to get the :id value

  const topicById = topics.find((topic) => topic.id === id);

  if (!topicById) {
    res.status(404).json({ error: "Topic not found" });
    return;
  }

  //If id found move to this step
  const { name, color } = req.body; //Take new request value from body
  //Assign the topic found with ID value with new value from body
  topicById.name = name;
  topicById.color = color;
  topicById.updatedAt = new Date(); // Update time

  res.status(200).json({ data: "True" });
});

//Delete by id
app.delete("/v1/topics/:id", (req: Request, res: Response) => {
  //Find topic first if not return error
  const { id } = req.params; // This to get the :id value

  const topicById = topics.find((topic) => topic.id === id);

  if (!topicById) {
    res.status(404).json({ error: "Topic not found" });
    return;
  }

  //If id found move to this step
  topics = topics.filter((topic) => topic.id !== id); // delete mechanism

  res.status(200).json({ data: true });
});

//List all data
app.get("/v1/topics", (req: Request, res: Response) => {
  res.status(200).json({ data: topics });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
