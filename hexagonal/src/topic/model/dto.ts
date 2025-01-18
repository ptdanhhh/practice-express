// DTO = Data transfer object

export type TopicCreationDTO = {
  name: string;
  color: string;
};

export type TopicUpdateDTO = {
  name?: string;
  color?: string;
};
