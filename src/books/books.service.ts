import BookEntity from '../db/entity/book.entity';
import CreateBookDto from './dto/create-book.dto';
import UserEntity from '../db/entity/user.entity';
import { createQueryBuilder, DeleteResult, getConnection } from 'typeorm';
import GenreEntity from '../db/entity/genre.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class BooksService {

  async insert(bookDetails: CreateBookDto): Promise<BookEntity> {
    const { name , userID , genreIDs } = bookDetails;
    const book = new BookEntity();
    book.name = name;
    book.user = await UserEntity.findOne(userID) ;
    book.genres=[];
    if (genreIDs != undefined) {
      for ( let i = 0; i < genreIDs.length ; i++) {
        const genre = await GenreEntity.findOne(genreIDs[i]);
        book.genres.push(genre);
      }
    }
    
    await book.save();
    return book;
  }

  async getAllBooks(): Promise<BookEntity[] > {
    // const user: UserEntity = await UserEntity.findOne({where: {id: 2}, relations: ['books']});
    return BookEntity.find();
  }

  async deleteBook(bookID: number): Promise<DeleteResult> {
    return BookEntity.delete(bookID);
  }

  async editBook(bookID: number, bookDetails: CreateBookDto) {
    const book: BookEntity = await BookEntity.findOne({where: {id: bookID}});
    book.name = bookDetails.name;
    return await BookEntity.update(bookID, book)
  }
}