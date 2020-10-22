import { Entity, Column } from 'typeorm';

import { IUser } from '../interfaces/users.interface';
import { BaseEntity } from '@shared/entities/base.entity';

@Entity('users')
export class UserEntity extends BaseEntity implements IUser {
  @Column()
  email: string;

  @Column({ nullable: true, default: null })
  name: null | string;

  @Column()
  password: string;
}
