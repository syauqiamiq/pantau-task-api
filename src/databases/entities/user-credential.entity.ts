import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { IUser } from '../interfaces/user.interface';
import { BaseEntity } from './base.entity';
import { IUserCredential } from '../interfaces/user-credential.interface';
import { User } from './user.entity';

@Entity('user_credentials')
export class UserCredential extends BaseEntity implements IUserCredential {
  @Column({
    name: 'user_id',
    type: 'integer',
  })
  userId: string;

  @Column({
    name: 'password',
    type: 'varchar',
  })
  password: string;

  @Column({
    name: 'is_active',
    type: 'boolean',
  })
  isActive: boolean | any;

  @OneToOne(() => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: IUser;
}
