import { ICredential } from '@shared-types/credentials/domain/models/entities/ICredential';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('credential')
export default class Credential implements ICredential {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  senderId: string;
}
