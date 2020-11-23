import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dtos';
import { UserEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private readonly repo: Repository<UserEntity>,
  ) {}

  async getUsers(): Promise<UserEntity[]> {
    return await this.repo.find();
  }

  async create(userDto: CreateUserDto): Promise<UserEntity> {
    const userExist = await this.repo.findOne({ email: userDto.email });
    if (userExist)
      throw new BadRequestException('User already registered with email');

    const newUser = this.repo.create(userDto);
    const user = await this.repo.save(newUser);

    delete user.password;
    return user;
  }

  async update(id: string, userDto: UpdateUserDto): Promise<UserEntity> {
    const userToUpdate: UserEntity = await this.repo.findOne(id);
    delete userToUpdate.password;

    if (userToUpdate.id !== id) throw new BadRequestException('User not found');

    const userUpdated = Object.assign(userToUpdate, userDto);
    return await this.repo.save(userUpdated);
  }

  async delete(id: string) {
    return await this.repo.delete(id);
  }
}
