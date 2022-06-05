import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from 'src/entities/user.entity';
import { Book } from 'src/entities/book.entity';
import { UserService } from '../services/user/user.service';
import { UserController } from '../controllers/user/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Book])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
