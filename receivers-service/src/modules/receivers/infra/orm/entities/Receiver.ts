import {
  ILocation,
  IReceiver,
} from '@modules/receivers/domain/models/entities/IReceiver';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('receiver')
export default class Receiver implements IReceiver {
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
  location?: ILocation;
}
