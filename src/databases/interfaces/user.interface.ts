import { IBaseEntity } from './base.interface';
import { IUserAttachment } from './user-attachment.interface';
import { IUserCredential } from './user-credential.interface';

export interface IUser extends IBaseEntity {
  fullName: string;
  email: string;
  contactNumber: string;
  address: string;
  userCredential?: IUserCredential;
  userAttachments?: IUserAttachment[];
}
