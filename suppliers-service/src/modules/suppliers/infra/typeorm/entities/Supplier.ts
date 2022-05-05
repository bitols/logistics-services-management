import { ISupplier } from '@modules/suppliers/domain/models/entities/ISupplier';
import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity('supplier')
export default class Supplier implements ISupplier {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;
}
