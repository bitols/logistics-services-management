import { IProduct } from '@modules/products/domain/models/entities/IProduct';
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
  depotId: string;

  @Column()
  clientId: string;
}
