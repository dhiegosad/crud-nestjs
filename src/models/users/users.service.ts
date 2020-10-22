import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
  ) {}

  async getUsers(): Promise<UserEntity[]> {
    return await this.repo.find();
  }

  async create(user: UserEntity): Promise<UserEntity> {
    return await this.repo.save(user);
  }

  async update(id: string, user: UserEntity): Promise<UserEntity> {
    const userToUpdate: UserEntity = await this.repo.findOne(id);
    delete userToUpdate.password;

    const userUpdated = Object.assign(userToUpdate, user);
    return await this.repo.save(userUpdated);
  }

  async delete(id: string) {
    return await this.repo.delete(id);
  }
}
