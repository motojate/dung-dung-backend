import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { Schedule } from './model/schedule.model'
import { Logger } from 'winston'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { CreateScheduleInput, FindScheduleFilter } from './dto/shedule.input'
import { CrudService } from 'src/shared/interfaces/factory.interface'
@Injectable()
export class ScheduleService implements CrudService<Schedule> {
  constructor(private readonly prisma: PrismaService, @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  async findAll(): Promise<Schedule[]> {
    try {
      return await this.prisma.schedule.findMany()
    } catch (e) {
      this.logger.error(e)
    }
  }
  async findUnique(dto: any): Promise<Schedule> {
    try {
      return await this.prisma.schedule.findUnique({
        where: {
          id: dto.id
        }
      })
    } catch (e) {
      this.logger.error(e)
    }
  }

  async create(dto: CreateScheduleInput): Promise<boolean> {
    try {
      await this.prisma.schedule.create({
        data: {
          startTime: dto.startTime,
          endTime: dto.endTime,
          title: dto.title,
          day: dto.day,
          calenderId: dto.month,
          isSpecial: dto.isSpecial,
          users: {
            connect: {
              id: dto.userId
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
  async update(dto: CreateScheduleInput): Promise<boolean> {
    try {
      await this.prisma.schedule.create({
        data: {
          startTime: dto.startTime,
          endTime: dto.endTime,
          title: dto.title,
          day: dto.day,
          calenderId: dto.month,
          isSpecial: dto.isSpecial,
          users: {
            connect: {
              id: dto.userId
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

  async delete(dto: CreateScheduleInput): Promise<boolean> {
    try {
      await this.prisma.schedule.create({
        data: {
          startTime: dto.startTime,
          endTime: dto.endTime,
          title: dto.title,
          day: dto.day,
          calenderId: dto.month,
          isSpecial: dto.isSpecial,
          users: {
            connect: {
              id: dto.userId
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

  async findByFilter(dto: FindScheduleFilter): Promise<Schedule[]> {
    try {
      return await this.prisma.schedule.findMany({
        where: {
          calenderId: dto.month
        },
        include: {
          users: {
            where: {
              id: dto.userId
            }
          }
        }
      })
    } catch (e) {
      this.logger.error(e)
    }
  }
}
