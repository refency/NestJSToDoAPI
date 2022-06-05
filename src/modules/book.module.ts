import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Book } from 'src/entities/book.entity';
import { BookService } from 'src/services/book/book.service';
import { BookController } from 'src/controllers/book/book.controller';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), TypeOrmModule.forFeature([User])],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
