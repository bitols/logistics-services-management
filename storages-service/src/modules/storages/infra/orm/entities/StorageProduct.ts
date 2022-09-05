import { IStorageProduct } from '@modules/storages/domain/models/entities/IStorageProduct';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
@Entity('storageProduct')
export default class StorageProduct implements IStorageProduct {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  height: number;

  @Column()
  width: number;

  @Column()
  lenght: number;

  @Column()
  value: number;

  @Column()
  storageId: string;

  @Column()
  productId: string;
}
