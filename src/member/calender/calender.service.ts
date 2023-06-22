import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { Calendar } from './model/calendar.model'

@Injectable()
export class CalenderService {
  constructor(private prisma: PrismaService) {}

  async findAllCalenderWithSchedule(): Promise<Calendar[]> {
    return this.prisma.calendar.findMany({
      include: {
        schedules: true
      }
    })
  }

  async test() {
    console.log('test')
  }
}
