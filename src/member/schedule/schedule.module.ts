import { Module } from '@nestjs/common'
import { ScheduleService } from './schedule.service'
import { ScheduleResolver } from './schedule.resolver'

@Module({
  providers: [ScheduleService, ScheduleResolver]
})
export class ScheduleModule {}
