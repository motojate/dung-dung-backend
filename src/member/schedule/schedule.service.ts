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
        day: new Date(),
        calenderId: 1
      }
    })
  }

  async findByScheduleFromUser(user) {
    const result = await this.prisma.schedule.findMany({
      include: {
        users: {
          where: {
            id: user.id
          }
        }
      }
    })
    console.log(result)
    return result
  }
}
