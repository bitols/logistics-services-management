import { ConnectionOptions, createConnection } from 'typeorm';
import ormconfig from '@config/ormconfig';
createConnection(ormconfig as ConnectionOptions);
