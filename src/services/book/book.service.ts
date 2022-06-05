import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from 'src/entities/book.entity';
import { rentBook } from 'src/controllers/book/rent_book.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookExist(id);

    return book;
  }

  async rent(rentBook: rentBook): Promise<Book> {
    const book = await this.bookExist(String(rentBook.bookId));

    if (book.userId || !book) {
      throw new NotFoundException(
        `Book is rent now by other user or book doesn't exist`,
      );
    }

    const user = await this.usersRepository.findOne({
      where: { id: rentBook.userId },
    });

    if (!user.pass || !user) {
      throw new NotFoundException(
        `User doesn't have pass or user doesn't exist`,
      );
    }

    const countBooks = await this.booksRepository.count({
      where: { userId: rentBook.userId },
    });

    if (countBooks === 5) {
      throw new NotFoundException(`User reached maximum count of books`);
    }

    return this.booksRepository.save({
      id: rentBook.bookId,
      userId: rentBook.userId,
    });
  }

  async returnBook(id: string): Promise<Book> {
    await this.bookExist(id);

    return this.booksRepository.save({
      id: Number(id),
      userId: null,
    });
  }

  async create(book: Book): Promise<Book> {
    return this.booksRepository.save(book);
  }

  async update(id: string, book: Book): Promise<Book> {
    const existedBook = await this.bookExist(id);

    return this.booksRepository.save({
      id: Number(id),
      name: book.name ? book.name : existedBook.name,
      userId: book.userId ? book.userId : existedBook.userId,
    });
  }

  async remove(id: string) {
    await this.bookExist(id);

    await this.booksRepository.delete(id);
  }

  async bookExist(id: string): Promise<Book> {
    const book = await this.booksRepository.findOne({
      where: { id: Number(id) },
    });

    if (!book) {
      throw new NotFoundException(`Book doesn't exist or id incorrect`);
    }

    return book;
  }
}
