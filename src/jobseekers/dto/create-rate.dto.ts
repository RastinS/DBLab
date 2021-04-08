import { ApiProperty } from '@nestjs/swagger'
import { Max, Min } from 'class-validator';

export default class CreateRateDto {

    @ApiProperty()
    @Min(0)
    @Max(10)
    readonly rate: number;

    @ApiProperty()
    readonly ratedID: number;
}