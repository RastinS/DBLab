import { Body, Controller, Get, Post } from '@nestjs/common';
import BooksService from './books.service';
import CreateBooksDto from './dto/create-book.dto';

@Controller('book')
export default class BooksController {
  constructor(private readonly booksServices: BooksService) {}
  @Post('post')
  postGenre( @Body() book: CreateBooksDto) {
    return this.booksServices.insert(book);
  }
  @Get()
  getAll() {
    return this.booksServices.getAllBooks();
  }
}