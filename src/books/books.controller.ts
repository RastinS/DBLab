import { Body, Controller, Get, Post, Delete, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import BooksService from './books.service';
import CreateBooksDto from './dto/create-book.dto';
import {ApiBearerAuth, ApiResponse} from '@nestjs/swagger';


@Controller('book')
export default class BooksController {
  constructor(private readonly booksServices: BooksService) {}

  @ApiBearerAuth('JWT')
  @ApiResponse({ status: 401, description: 'Unauthorized' }) 
  @UseGuards(JwtAuthGuard)
  @Post('post')
  postGenre( @Body() book: CreateBooksDto) {
    return this.booksServices.insert(book);
  }

  @Get()
  getAll() {
    return this.booksServices.getAllBooks();
  }

  @ApiBearerAuth('JWT')
  @ApiResponse({ status: 401, description: 'Unauthorized' }) 
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  deleteBook( @Param('id', ParseIntPipe) bookID : number) {
    return this.booksServices.deleteBook(bookID);
  }

  @ApiBearerAuth('JWT')
  @ApiResponse({ status: 401, description: 'Unauthorized' }) 
  @UseGuards(JwtAuthGuard)
  @Put('put/:id')
  editBook(@Body() bookDetails: CreateBooksDto, @Param('id', ParseIntPipe) bookID: number) {
    return this.booksServices.editBook(bookID, bookDetails);
  }
}