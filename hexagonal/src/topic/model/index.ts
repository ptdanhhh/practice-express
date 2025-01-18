//Business model usually matching columm with db

export type Topic = {
  id: string;
  name: string;
  color: string;
  postCount: number;
  createdAt: Date;
  updatedAt: Date;
};
