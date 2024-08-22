import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { IUserAttachment } from '../interfaces/user-attachment.interface';
import { IUserCredential } from '../interfaces/user-credential.interface';
import { IUser } from '../interfaces/user.interface';
import { BaseEntity } from './base.entity';
import { UserAttachment } from './user-attachment.entity';
import { UserCredential } from './user-credential.entity';

@Entity('users')
export class User extends BaseEntity implements IUser {
  @Column({
    name: 'full_name',
    type: 'varchar',
  })
  fullName: string;

  @Column({
    name: 'email',
    type: 'varchar',
  })
  email: string;

  @Column({
    name: 'contact_number',
    type: 'varchar',
  })
  contactNumber: string;

  @Column({
    name: 'address',
    type: 'varchar',
  })
  address: string;

  @OneToOne(() => UserCredential, (data) => data.user)
  userCredential: IUserCredential;

  @OneToMany(() => UserAttachment, (data) => data.user)
  userAttachments: IUserAttachment[];
}
