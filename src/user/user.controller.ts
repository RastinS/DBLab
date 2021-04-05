import { Body, Controller, Delete, Get, ParseIntPipe, Post, Put, Param } from '@nestjs/common';
import { UserServices } from './user.service';
import CreateUserDto from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly usersServices: UserServices) {}

//'postUser()' will handle the creating of new User
  @Post('post')
  postUser( @Body() user: CreateUserDto) {
    return this.usersServices.insert(user);
  }
// 'getAll()' returns the list of all the existing users in the database
  @Get()
  getAll() {
    return this.usersServices.getAllUsers();
  }

//'getBooks()' return all the books which are associated with the user 
// provided through 'userID' by the request  
  @Get('books')
  getBooks( @Body('userID', ParseIntPipe) userID: number ) {
    return this.usersServices.getBooksOfUser(userID);
  }

  @Delete('delete/:id')
  deleteUser( @Param('id', ParseIntPipe) userID: number) {
    return this.usersServices.deleteUser(userID);
  }

  @Put('put/:id')
  edituser(@Body() userDetails: CreateUserDto, @Param('id', ParseIntPipe) userID: number) {
    return this.usersServices.editUser(userID, userDetails)
  }
}