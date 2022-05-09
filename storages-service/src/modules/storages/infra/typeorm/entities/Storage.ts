import { IStorage } from '@modules/storages/domain/models/entities/IStorage';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('storage')
export default class Storage implements IStorage {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  supplierId: string;
}
