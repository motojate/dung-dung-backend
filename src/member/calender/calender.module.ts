import { Module } from '@nestjs/common'
import { CalenderResolver } from './calender.resolver'
import { CalenderService } from './calender.service'
import { PrismaModule } from 'src/shared/prisma/prisma.module'

@Module({
  providers: [CalenderResolver, CalenderService],
  imports: [PrismaModule]
})
export class CalenderModule {}
