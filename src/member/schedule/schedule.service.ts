import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async createSchedule() {
    return this.prisma.schedule.create({
      data: {
        startTime: new Date(),
        endTime: new Date(),
        title: 'test',
        day: new Date()
      }
    })
  }
}
