import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserEntity } from '../users/entities/users.entity';
import { UsersService } from '@models/users/users.service';
import { CreateUserDto, UpdateUserDto } from './dtos';

@Controller('users')
export class UsersController {
  constructor(private readonly usersServices: UsersService) {}

  @Get()
  async getUsers(): Promise<UserEntity[]> {
    return await this.usersServices.getUsers();
  }

  @Post()
  async create(@Body() userDto: CreateUserDto) {
    return await this.usersServices.create(userDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() userDto: UpdateUserDto) {
    return await this.usersServices.update(id, userDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersServices.delete(id);
  }
}
