import { Module } from '@nestjs/common';
import { JobseekersService } from './jobseekers.service';
import { JobseekersController } from './jobseekers.controller';
import { RolesGuard } from './roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  providers: [
    JobseekersService,
  ],
  controllers: [JobseekersController]
})
export class JobseekersModule {}
