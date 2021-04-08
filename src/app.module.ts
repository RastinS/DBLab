import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JobseekersModule } from './jobseekers/jobseekers.module';
import UserEntity from './db/entity/user.entity';
import BooksModule from './Books/books.module';
import GenreModule from './Genre/genre.module';
import BookEntity from './db/entity/book.entity';
import GenreEntity from './db/entity/genre.entity';

@Module({
  imports: [HelloModule, BooksModule, UserModule, GenreModule,
    TypeOrmModule.forFeature(
      [UserEntity, BookEntity , GenreEntity],
    ),

    TypeOrmModule.forRoot(),

    AuthModule,

    JobseekersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
