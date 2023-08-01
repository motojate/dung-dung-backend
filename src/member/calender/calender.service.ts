import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/shared/prisma/prisma.service'
import { Calendar } from './model/calendar.model'
import { CalendarFilterInput } from './dto/calendar-filter.input'
import { CrudService } from 'src/shared/interfaces/factory.interface'
import { WINSTON_MODULE_PROVIDER } from 'nest-winston'
import { Logger } from 'winston'

@Injectable()
export class CalenderService implements CrudService<Calendar> {
  constructor(private readonly prisma: PrismaService, @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}
  async create(dto: Partial<Calendar>): Promise<boolean> {
    try {
      return true
    } catch (e) {
      this.logger.error(e)
    }
  }
  delete(dto: Partial<Calendar>): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  update(dto: Partial<Calendar>): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  findUnique(dto: Partial<Calendar>): Promise<Calendar> {
    throw new Error('Method not implemented.')
  }
  async findAll(): Promise<Calendar[]> {
    try {
      return this.prisma.calendar.findMany({
        include: {
          schedules: true
        }
      })
    } catch (e) {
      this.logger.error(e)
    }
  }
  async findByFilter(dto: CalendarFilterInput): Promise<Calendar[]> {
    try {
      return await this.prisma.calendar.findMany({
        where: {
          month: { in: dto.months }
        },
        include: {
          schedules: true
        }
      })
    } catch (e) {
      this.logger.error(e)
    }
  }

  // async findAllCalenderWithSchedule(): Promise<Calendar[]> {
  //   return this.prisma.calendar.findMany({
  //     include: {
  //       schedules: true
  //     }
  //   })
  // }

  // async findCustomMonthCalenderWithSchedule(dto: CalendarFilterInput): Promise<Calendar[]> {
  //   return this.prisma.calendar.findMany({
  //     where: {
  //       month: { in: dto.month }
  //     },
  //     include: {
  //       schedules: true
  //     }
  //   })
  // }
}
