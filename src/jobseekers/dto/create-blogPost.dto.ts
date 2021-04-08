import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export default class CreateBlogPostDto {
    @ApiProperty()
    readonly title: string;

    @ApiProperty()
    @Type(() => Date)
    readonly date: Date;

    @ApiProperty()
    readonly text: string;
  }