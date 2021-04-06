import { Body, Controller, Get, Post, Delete, Param, ParseIntPipe, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import GenreServices from './genre.service';
import CreateGenreDto from './dto/create-genre.dto';

@UseGuards(JwtAuthGuard)
@Controller('genre')
export default class GenreController {
  constructor(private readonly genreServices: GenreServices) {}

  @Post('post')
  postGenre( @Body() genre: CreateGenreDto) {
    return this.genreServices.insert(genre);
  }

  @Get()
  getAll() {
    return this.genreServices.getAllGenre();
  }

  @Delete('delete/:id')
  deleteGenre( @Param('id', ParseIntPipe) genreID : number) {
    return this.genreServices.deleteGenre(genreID);
  }

  @Put('put/:id')
  edituser(@Body() genreDetails: CreateGenreDto, @Param('id', ParseIntPipe) genreID: number) {
    return this.genreServices.editGenre(genreID, genreDetails)
  }
}