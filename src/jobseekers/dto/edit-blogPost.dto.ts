import { ApiProperty } from '@nestjs/swagger';

export default class EditBlogPostDto {
    @ApiProperty()
    readonly title: string;

    @ApiProperty()
    readonly text: string;
  }