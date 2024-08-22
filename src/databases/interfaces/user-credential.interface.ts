import { IBaseEntity } from './base.interface';
import { IUser } from './user.interface';

export interface IUserCredential extends IBaseEntity {
  userId: string;
  password: string;
  isActive: boolean | any;
  user?: IUser;
}
