import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import { ITopicService } from "../../interfaces";
import { TopicCreationDTO, TopicUpdateDTO } from "../../model/dto";

export class TopicHTTPController {
  constructor(private readonly service: ITopicService) {}

  async listTopicsAPI(req: Request, res: Response) {
    try {
      const topics = await this.service.listTopics();
      res.status(StatusCodes.OK).json({ data: topics });
    } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err });
    }
  }

  async createTopicAPI(req: Request, res: Response) {
    try {
      const { name, color } = req.body;
      const dto: TopicCreationDTO = { name, color };

      const newId = await this.service.createTopic(dto);
      res.status(StatusCodes.CREATED).json({ data: newId });
    } catch (err) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: (err as Error).message });
    }
  }

  async updateTopicAPI(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, color } = req.body;

      const dto: TopicUpdateDTO = { name, color };
      await this.service.updateTopic(id, dto);

      res.status(StatusCodes.OK).json({ data: true });
    } catch (err) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: (err as Error).message });
    }
  }

  async deleteTopicAPI(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.service.deleteTopic(id);

      res.status(StatusCodes.OK).json({ data: true });
    } catch (err) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: (err as Error).message });
    }
  }

  async getTopicAPI(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const topic = await this.service.getTopic(id);

      if (!topic) {
        res.status(StatusCodes.NOT_FOUND).json({ error: "Topic not found" });
        return;
      }

      res.status(StatusCodes.OK).json({ data: topic });
    } catch (err) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: (err as Error).message });
    }
  }

  getRoute(): Router {
    const router = Router();

    // CRUDL
    router.post("/topics", this.createTopicAPI.bind(this)); // Create
    router.get("/topics/:id", this.getTopicAPI.bind(this)); // Read
    router.patch("/topics/:id", this.updateTopicAPI.bind(this)); // Update
    router.delete("/topics/:id", this.deleteTopicAPI.bind(this)); // Delete
    router.get("/topics", this.listTopicsAPI.bind(this)); // List

    // router.post("/topics", (req: Request, res: Response) => this.createTopicAPI(req, res))
    return router;
  }
}
