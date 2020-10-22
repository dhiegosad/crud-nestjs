import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserEntity } from './entities/users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersServices: UsersService) {}

  @Get()
  async getUsers(): Promise<UserEntity[]> {
    return await this.usersServices.getUsers();
  }

  @Post()
  async create(@Body() user: UserEntity) {
    return await this.usersServices.create(user);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: UserEntity) {
    return await this.usersServices.update(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.usersServices.delete(id);
  }
}
