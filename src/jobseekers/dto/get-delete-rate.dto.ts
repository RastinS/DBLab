import {ApiProperty} from '@nestjs/swagger'

export default class GetDeleteRateDto {
    @ApiProperty()
    readonly ratedID: number;
}