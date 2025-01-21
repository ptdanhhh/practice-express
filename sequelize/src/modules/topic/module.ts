import { Router } from "express";
import { TopicHTTPController } from "./infras/controller";
import { sequelize } from "../../share/component/sequelize";
import { init } from "./infras/repository/dto";
import { TopicService } from "./service";
import { TopicInMemoryRepository } from "./infras/repository/memory";
import { TopicSequelizeRepository } from "./infras/repository/sequelize";

export function setupTopicHTTPModule(): Router {
  init(sequelize);
  // setup dependencies
  // const repository = new TopicInMemoryRepository();
  // const cacheRepository = new CacheTopicRepository(repository);

  const repository = new TopicSequelizeRepository();
  const service = new TopicService(repository);
  const httpController = new TopicHTTPController(service);

  return httpController.getRoute();
}
