import { Topic } from "modules/topic/model";
import { TopicUpdateDTO } from "modules/topic/model/dto";
import { ITopicRepository } from "../../interfaces";
import { TopicPersistent } from "./dto";

export class TopicSequelizeRepository implements ITopicRepository {
  async list(): Promise<Topic[]> {
    const topics = await TopicPersistent.findAll();
    return topics.map((topic) => this._toModel(topic));
  }

  async create(topic: Topic): Promise<void> {
    await TopicPersistent.create(this._toPersistent(topic));
  }

  async findByName(name: string): Promise<Topic | null> {
    const topic = await TopicPersistent.findOne({ where: { name } });
    return topic ? this._toModel(topic) : null;
  }

  async findById(id: string): Promise<Topic | null> {
    const topic = await TopicPersistent.findByPk(id);
    return topic ? this._toModel(topic) : null;
  }

  async update(id: string, dto: TopicUpdateDTO): Promise<void> {
    await TopicPersistent.update(dto, { where: { id } });
  }

  async delete(id: string): Promise<void> {
    await TopicPersistent.destroy({ where: { id } });
  }

  private _toModel(topic: TopicPersistent): Topic {
    const { created_at, updated_at, ...data } = topic.get({ plain: true });

    return {
      ...data,
      createdAt: created_at,
      updatedAt: updated_at,
    };
  }

  private _toPersistent(topic: Topic): any {
    const { createdAt, updatedAt, ...data } = topic;

    return {
      ...data,
      created_at: createdAt,
      updated_at: updatedAt,
    };
  }
}
