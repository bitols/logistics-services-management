import { DataSource } from 'typeorm';
import ormconfig from './ormconfig';

const dataSource = new DataSource(ormconfig);
dataSource.initialize();
