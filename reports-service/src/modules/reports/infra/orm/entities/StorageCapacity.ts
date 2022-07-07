import { IStorageCapacity } from '@modules/reports/domain/models/entities/IStorageCapacity';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('storageCapacity')
export default class StorageCapacity implements IStorageCapacity {
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
  products: number;

  @Column()
  value: number;

  @Column()
  senderId: string;
}
