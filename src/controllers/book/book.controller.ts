import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Book } from 'src/entities/book.entity';
import { BookService } from 'src/services/book/book.service';
import { rentBook } from './rent_book.dto';

@ApiTags('Book API')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // Get book by id
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get book by id',
    type: Book,
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  getBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.findOne(id);
  }

  // Get list of all books
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get list of all books',
    type: Book,
  })
  getBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  // Clearing userId so other users can rent books
  @Get('/return/:id')
  @ApiResponse({
    status: 200,
    description: 'Book has been returned',
    type: Book,
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  returnBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.returnBook(id);
  }

  // Create book
  @Post()
  @ApiResponse({
    status: 200,
    description: 'Book has been created',
    type: Book,
  })
  @ApiBody({ type: Book })
  createBook(@Body() user: Book): Promise<Book> {
    return this.bookService.create(user);
  }

  // Change status of rent current book
  @Post('/rent')
  @ApiResponse({
    status: 200,
    description: 'Book has been rented',
    type: Book,
  })
  @ApiBody({ type: rentBook })
  rentBook(@Body() rentBook: rentBook): Promise<Book> {
    return this.bookService.rent(rentBook);
  }

  // Edit book by id
  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Book has been changed',
    type: Book,
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  async editBook(@Param('id') id: string, @Body() user: Book): Promise<Book> {
    return this.bookService.update(id, user);
  }

  // Delete book by id
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Delete book',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  async deleteBook(@Param('id') id: string) {
    await this.bookService.remove(id);

    return 'Book has been deleted';
  }
}
