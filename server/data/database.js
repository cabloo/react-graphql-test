/* @flow */
import { Database } from "mongodb";

// mock data
export class Article {
  id: string;
  title: string;
  author: string;
}

export default class DB {
  static instance: Database;
}
