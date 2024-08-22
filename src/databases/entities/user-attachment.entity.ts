import { UserAttachmentTypeEnum } from 'src/common/enums/user-attachment.enum';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IUserAttachment } from '../interfaces/user-attachment.interface';
import { User } from './user.entity';
import { IUser } from '../interfaces/user.interface';
import { BaseEntity } from './base.entity';

@Entity('user_attachments')
export class UserAttachment extends BaseEntity implements IUserAttachment {
  @Column({
    name: 'user_id',
    type: 'integer',
  })
  userId?: any;

  @Column({
    name: 'type',
    type: 'varchar',
  })
  type?: UserAttachmentTypeEnum;

  @Column({
    name: 'document_name',
    type: 'varchar',
  })
  documentName?: string;

  @Column({
    name: 'path',
    type: 'varchar',
  })
  path?: string;

  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  @ManyToOne(() => User)
  user: IUser;
}
