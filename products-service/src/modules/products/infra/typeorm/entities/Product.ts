import { IProduct } from '@shared-types/products/domain/models/entities/IProduct';
import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity('product')
export default class Product implements IProduct {
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
  price: number;

  @Column()
  storageId: string;

  @Column()
  senderId: string;
}
