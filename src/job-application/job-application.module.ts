import { Module } from '@nestjs/common';
import { JobApplicationService } from './job-application.service';
import { JobApplicationController } from './job-application.controller';

@Module({
  providers: [JobApplicationService],
  controllers: [JobApplicationController]
})
export class JobApplicationModule {}
