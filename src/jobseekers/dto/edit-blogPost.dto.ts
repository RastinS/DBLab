import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export default class EditBlogPostDto {
    @ApiProperty()
    readonly title: string;

    @ApiProperty()
    readonly text: string;
  }