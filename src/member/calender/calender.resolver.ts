import { Resolver, Query } from '@nestjs/graphql'
import { CalenderService } from './calender.service'
import { Calendar } from './model/calendar.model'

@Resolver()
export class CalenderResolver {
  constructor(private calenderService: CalenderService) {}

  @Query(() => [Calendar])
  async findAllCalenderWithSchedule(): Promise<Calendar[]> {
    return await this.calenderService.findAllCalenderWithSchedule()
  }
}
