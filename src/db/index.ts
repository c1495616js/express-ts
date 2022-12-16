import { DataSource } from 'typeorm';
import { dbConnection } from './data-source';

export default new DataSource(dbConnection);
