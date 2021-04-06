import { Module } from '@nestjs/common';
import { UserServices } from './user.service';
import { UserController } from './user.controller';
@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserServices],
  exports: [UserServices],
})
export class UserModule {}