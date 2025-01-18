import { Router } from "express";
import { TopicHTTPController } from "./infras/controller";
import { TopicService } from "./service";
import { TopicInMemoryRepository } from "./infras/repository/memory";

export function setupTopicHTTPModule(): Router {
  const router = Router();

  // setup dependencies
  const repository = new TopicInMemoryRepository();
  const service = new TopicService(repository);
  const httpController = new TopicHTTPController(service);

  return httpController.getRoute();

  //router.get("/topics", httpController.listTopicsAPI.bind(httpController));

  return router;
}
