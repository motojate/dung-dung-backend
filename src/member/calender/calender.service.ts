import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { Calendar } from './model/calendar.model'
import { CalendarFilterInput } from './dto/calendar-filter.input'

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

  async findCustomMonthCalenderWithSchedule(dto: CalendarFilterInput): Promise<Calendar[]> {
    return this.prisma.calendar.findMany({
      where: {
        month: { in: dto.month }
      },
      include: {
        schedules: true
      }
    })
  }
}
