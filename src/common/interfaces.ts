import User from '../entity/user';

export type Entity = User;

export interface ResultWithData {
  data: Record<string, any> | Record<string, any>[];
}

export interface ResultWithMessage {
  message: string;
}
