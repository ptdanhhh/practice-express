import { Topic } from "topic/model";
import { TopicCreationDTO, TopicUpdateDTO } from "topic/model/dto";

export interface ITopicService {
  //This method need portion of topic variable so we use dto that we don't need whole topic
  //This method returns a promise that resolves a string (the UUID)
  createTopic(topic: TopicCreationDTO): Promise<string>;

  getTopic(id: string): Promise<Topic | null>;
  updateTopic(id: string, dto: TopicUpdateDTO): Promise<void>;
  deleteTopic(id: string): Promise<void>;

  //This method returns a promise that resolves to an array of topics
  listTopics(): Promise<Topic[]>;
}

export interface ITopicRepository {
  list(): Promise<Topic[]>;
  create(topic: Topic): Promise<void>;
  findByName(name: string): Promise<Topic | null>;
  findById(id: string): Promise<Topic | null>;
  update(id: string, dto: TopicUpdateDTO): Promise<void>;
  delete(id: string): Promise<void>;
}

//IService only have few method since that is the main method that we need to implement for service
