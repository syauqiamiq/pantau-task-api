import { UserAttachmentTypeEnum } from 'src/common/enums/user-attachment.enum';
import { IBaseEntity } from './base.interface';
import { IUser } from './user.interface';

export interface IUserAttachment extends IBaseEntity {
  userId?: number | any;
  type?: UserAttachmentTypeEnum;
  path?: string;
  documentName?: string;
  user?: IUser;
}
