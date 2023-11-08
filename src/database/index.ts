import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as Entities from './entities';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  entities: Entities,
  synchronize: true,
  // debug: true,
});
