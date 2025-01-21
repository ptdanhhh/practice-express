import { ITopicRepository, ITopicService } from "../interfaces";
import { Topic } from "../model";
import { TopicCreationDTO, TopicUpdateDTO } from "../model/dto";
import {
  ErrTopicNameCannotEmpty,
  ErrTopicNameCannotDuplicate,
  ErrTopicNotFound,
} from "../model/error";
import { v7 } from "uuid";

export class TopicService implements ITopicService {
  constructor(private readonly repository: ITopicRepository) {}

  //All logic of method will be implemented here
  //Add more logic if needed
  //Otherwise just call repository.method()
  //Here we can write logic without worry about DB, etc

  async createTopic(dto: TopicCreationDTO): Promise<string> {
    // 1. Validate DTO
    // Check name if empty
    if (dto.name.length === 0) {
      throw ErrTopicNameCannotEmpty;
    }

    // 2. Check if topic name is duplicate
    const existingTopic = await this.repository.findByName(dto.name);

    if (existingTopic) {
      throw ErrTopicNameCannotDuplicate;
    }

    // 3. Create topic
    // 3.1 Map DTO to Topic (Data Mapper)
    const newId = v7();
    const newTopic: Topic = {
      id: newId,
      name: dto.name,
      color: dto.color,
      postCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // 3.2 Save to database

    await this.repository.create(newTopic);

    return newId;
  }

  async getTopic(id: string): Promise<Topic | null> {
    const existingTopic = await this.repository.findById(id);
    return existingTopic;
  }

  async updateTopic(id: string, dto: TopicUpdateDTO): Promise<void> {
    // 1. Validate DTO
    if (dto.name && dto.name.length === 0) {
      throw ErrTopicNameCannotEmpty;
    }

    // 2. Check if topic exists
    const existingTopic = await this.repository.findById(id);

    if (!existingTopic) {
      throw ErrTopicNotFound;
    }

    // 3. Check name is unique
    if (dto.name && dto.name !== existingTopic.name) {
      const topicWithName = await this.repository.findByName(dto.name);

      if (topicWithName) {
        throw ErrTopicNameCannotDuplicate;
      }
    }

    // 4. Update topic
    await this.repository.update(id, dto);
  }

  async deleteTopic(id: string): Promise<void> {
    const existingTopic = await this.repository.findById(id);

    if (!existingTopic) {
      throw ErrTopicNotFound;
    }

    await this.repository.delete(id);
  }

  async listTopics(): Promise<Topic[]> {
    return this.repository.list();
  }
}
