import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { Schedule } from './model/schedule.model'
import { Logger } from 'winston'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'

@Injectable()
export class ScheduleService {
  constructor(private readonly prisma: PrismaService, @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  async createScheduleFromUser(dto: any): Promise<boolean> {
    try {
      await this.prisma.schedule.create({
        data: {
          startTime: dto.startTime,
          endTime: dto.endTime,
          title: dto.title,
          day: dto.day,
          calenderId: dto.month,
          users: {
            connect: {
              id: dto.userIdㄱ
            }
          }
        }
      })

      return true
    } catch (e) {
      this.logger.error(e)
      return false
    }
  }

  async findByScheduleFromUserAndMonth(userId: number, month: number): Promise<Schedule[]> {
    try {
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
    } catch (e) {
      this.logger.error(e)
    }
  }
}
