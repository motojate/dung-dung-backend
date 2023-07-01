import { Module } from '@nestjs/common'
import { ScheduleService } from './schedule.service'
import { ScheduleResolver } from './schedule.resolver'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  providers: [ScheduleService, ScheduleResolver],
  imports: [PrismaModule]
})
export class ScheduleModule {}
