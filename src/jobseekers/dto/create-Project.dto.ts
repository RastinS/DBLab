import { ApiProperty } from '@nestjs/swagger';

export default class CreateProjectDto {
    @ApiProperty()
    readonly title: string;

    @ApiProperty()
    readonly deadline: Date;

    @ApiProperty()
    readonly type: string;

    @ApiProperty()
    readonly size: string;

    @ApiProperty()
    readonly description: string;

    @ApiProperty()
    readonly skillGuarantee: boolean;

    @ApiProperty()
    readonly subject: string;

  }