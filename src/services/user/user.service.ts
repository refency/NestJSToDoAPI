import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/entities/user.entity';
import { Book } from 'src/entities/book.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<{ [key: string]: any }> {
    const user = await this.userExist(id);

    const books = await this.booksRepository.find({
      where: { userId: user.id },
    });

    return {
      name: user.name,
      surname: user.surname,
      pass: user.pass,
      books: books,
    };
  }

  async create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async change(id: string): Promise<User> {
    const notUpdatedUser = await this.userExist(id);

    return this.usersRepository.save({
      id: Number(id),
      pass: notUpdatedUser.pass === false ? true : false,
    });
  }

  async update(id: string, user: User): Promise<User> {
    await this.userExist(id);

    return this.usersRepository.save({
      id: Number(id),
      name: user.name,
      surname: user.surname,
      pass: user.pass,
    });
  }

  async remove(id: string) {
    await this.userExist(id);

    await this.usersRepository.delete(id);
  }

  async userExist(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: Number(id) },
    });

    if (!user) {
      throw new NotFoundException(`User doesn't exist or id incorrect`);
    }

    return user;
  }
}
