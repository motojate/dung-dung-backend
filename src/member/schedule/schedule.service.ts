import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { Schedule } from './model/schedule.model'

@Injectable()
export class ScheduleService {
  constructor(private prisma: PrismaService) {}

  async createSchedule() {
    return this.prisma.schedule.create({
      data: {
        startTime: new Date(),
        endTime: new Date(),
        title: 'test',
        day: new Date(),
        calenderId: 1
      }
    })
  }

  async findByScheduleFromUserAndMonth(userId: number, month: number): Promise<Schedule[]> {
    return await this.prisma.schedule.findMany({
      where: {
        calenderId: month
      },
      include: {
        users: {
          where: {
            id: userId
          }
        }
      }
    })
  }
}
