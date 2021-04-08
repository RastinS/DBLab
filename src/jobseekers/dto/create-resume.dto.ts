import { ApiProperty } from '@nestjs/swagger';

export default class CreateResumeDto {
    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly text: string;
  }