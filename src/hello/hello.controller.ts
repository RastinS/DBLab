import { HelloService } from './hello.service'
import { Controller, Post, Body,Get, Header,Query } from '@nestjs/common';
import { PersonDto } from './dto/person.dto';
import {ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@Controller('hello')
export class HelloController {
    constructor(private readonly helloService: HelloService,) {}
    
    
}
