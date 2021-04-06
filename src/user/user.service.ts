import { Injectable } from '@nestjs/common';
import UserEntity from '../db/entity/user.entity';
import CreateUserDto from './dto/create-user.dto';
import BookEntity from '../db/entity/book.entity';
import {DeleteResult, getConnection} from "typeorm";

@Injectable()
export class UserServices {

  async insert(userDetails: CreateUserDto): Promise<UserEntity> {
    const userEntity: UserEntity = UserEntity.create();
    const {username, password} = userDetails;
    userEntity.username = username;
    userEntity.password = password;
    await UserEntity.save(userEntity);
    return userEntity;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await UserEntity.find();
  }

  async getBooksOfUser(userID: number): Promise<BookEntity[]> {
    console.log(typeof(userID));
    const user: UserEntity = await UserEntity.findOne({where: {id: userID}, relations: ['books']});
    return user.books;
  }

  async deleteUser(userID: number): Promise<DeleteResult> {
    return UserEntity.delete(userID);
  }

  async editUser(userID: number, userDetails: CreateUserDto) {
    const user: UserEntity = await UserEntity.findOne({where: {id: userID}});
    user.username = userDetails.username;
    return await UserEntity.update(userID, user)
  }

  async findUserForAuth(userID: number): Promise<UserEntity> {
    const user: UserEntity = await UserEntity.findOne({where: {id: userID}});
    return user;
  }
}