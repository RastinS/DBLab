import { Body, Controller, Delete, Get, ParseIntPipe, Post, Put, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserServices } from './user.service';
import CreateUserDto from './dto/create-user.dto';
import {ApiBearerAuth, ApiResponse} from '@nestjs/swagger';


@Controller('users')
export class UserController {
  constructor(private readonly usersServices: UserServices) {}

  @Post('post')
  postUser( @Body() user: CreateUserDto) {
    return this.usersServices.insert(user);
  }

  @ApiBearerAuth('JWT')
  @ApiResponse({ status: 401, description: 'Unauthorized' }) 
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.usersServices.getAllUsers();
  }

  @ApiBearerAuth('JWT')
  @ApiResponse({ status: 401, description: 'Unauthorized' }) 
  @UseGuards(JwtAuthGuard)
  @Get('books')
  getBooks( @Body('userID', ParseIntPipe) userID: number ) {
    return this.usersServices.getBooksOfUser(userID);
  }

  @ApiBearerAuth('JWT')
  @ApiResponse({ status: 401, description: 'Unauthorized' }) 
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  deleteUser( @Param('id', ParseIntPipe) userID: number) {
    return this.usersServices.deleteUser(userID);
  }

  @ApiBearerAuth('JWT')
  @ApiResponse({ status: 401, description: 'Unauthorized' }) 
  @UseGuards(JwtAuthGuard)
  @Put('put/:id')
  edituser(@Body() userDetails: CreateUserDto, @Param('id', ParseIntPipe) userID: number) {
    return this.usersServices.editUser(userID, userDetails)
  }
}