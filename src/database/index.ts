import 'reflect-metadata';
import { config } from 'src/common/config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource(config.db);
