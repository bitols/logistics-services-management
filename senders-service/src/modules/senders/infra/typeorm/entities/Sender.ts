import { ISender } from '@shared-types/senders/domain/models/entities/ISender';
import { Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity('supplier')
export default class Supplier implements ISender {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;
}
