import { Injectable } from '@nestjs/common';
import { UserServices } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import UserEntity from '../db/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserServices,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user: UserEntity = await UserEntity.findOne({where: {username: username}});
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const userEntity: UserEntity = await UserEntity.findOne({where: {username: user.username}});
    const payload = { username: userEntity.username, userID: userEntity.id, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}