import { Resolver, Query, Args } from '@nestjs/graphql'
import { CalenderService } from './calender.service'
import { Calendar } from './model/calendar.model'
import { CalendarFilterInput } from './dto/calendar-filter.input'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UseGuards } from '@nestjs/common'
@Resolver()
export class CalenderResolver {
  constructor(private calenderService: CalenderService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [Calendar])
  async findAllCalenderWithSchedule(): Promise<Calendar[]> {
    return this.calenderService.findAllCalenderWithSchedule()
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Calendar])
  async findCustomMonthCalenderWithSchedule(@Args('calendarFilterInput') calendarFilterInput: CalendarFilterInput): Promise<Calendar[]> {
    return this.calenderService.findCustomMonthCalenderWithSchedule(calendarFilterInput)
  }
}
