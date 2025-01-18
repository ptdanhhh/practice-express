import { ITopicRepository } from "../../interfaces";
import { Topic } from "../../model";
import { TopicUpdateDTO } from "../../model/dto";
import { ErrTopicNotFound } from "../../model/error";

//Logic in repository zone usually for handle logic to DB, cache, etc
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

export class TopicInMemoryRepository implements ITopicRepository {
  list(): Promise<Topic[]> {
    return Promise.resolve(topics);
  }

  create(topic: Topic): Promise<void> {
    topics.push(topic);
    return Promise.resolve();
  }

  findByName(name: string): Promise<Topic | null> {
    return Promise.resolve(topics.find((t) => t.name === name) || null);
  }

  findById(id: string): Promise<Topic | null> {
    return Promise.resolve(topics.find((t) => t.id === id) || null);
  }

  delete(id: string): Promise<void> {
    topics = topics.filter((t) => t.id !== id);
    return Promise.resolve();
  }

  update(id: string, dto: TopicUpdateDTO): Promise<void> {
    const topic = topics.find((t) => t.id === id);

    if (!topic) {
      throw ErrTopicNotFound;
    }

    topic.name = dto.name || topic.name;
    topic.color = dto.color || topic.color;
    topic.updatedAt = new Date();

    return Promise.resolve();
  }
}
