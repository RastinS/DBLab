import { Injectable } from '@nestjs/common';
import CreateGenreDto from './dto/create-genre.dto';
import GenreEntity from '../db/entity/genre.entity';
import {DeleteResult, getConnection} from "typeorm";

@Injectable()
export default class GenreServices {
    async insert(genreDetails: CreateGenreDto): Promise<GenreEntity> {

    const genreEntity: GenreEntity = GenreEntity.create();
    const {type} = genreDetails;

    genreEntity.type = type;
    await GenreEntity.save(genreEntity);
    return genreEntity;
  }

  async getAllGenre(): Promise<GenreEntity[]> {
        return await GenreEntity.find();
  }

  async deleteGenre(genreID: number): Promise<DeleteResult> {
    return GenreEntity.delete(genreID);
  }

  async editGenre(genreID: number, genreDetails: CreateGenreDto) {
    const genre: GenreEntity = await GenreEntity.findOne({where: {id: genreID}});
    genre.type = genreDetails.type;
    return await GenreEntity.update(genreID, genreDetails)
  }
}   