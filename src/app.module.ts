import { UsersModule } from './models/users/users.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '@config/database/mysql/config.service';
import { UsersService } from '@models/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UsersModule,
  ],
  providers: [UsersService],
})
export class AppModule {}
