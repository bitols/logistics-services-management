import { IProductStorageReport } from '@modules/reports/domain/models/entities/IProductStorageReport';
import { IStorageReport } from '@modules/reports/domain/models/entities/IStorageReport';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('storageReport')
export default class StorageReport implements IStorageReport {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  storageId: string;

  @Column()
  capacity: number;

  @Column()
  stored: number;

  @Column()
  usage: number;

  @Column()
  products: IProductStorageReport[];

  @Column()
  value: number;

  @Column()
  items: number;

  @Column()
  senderId: string;
}
