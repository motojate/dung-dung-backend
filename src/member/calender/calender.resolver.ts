import { Resolver, Query, Args } from '@nestjs/graphql'
import { CalenderService } from './calender.service'
import { Calendar } from './model/calendar.model'
import { CalendarFilterInput } from './dto/calendar-filter.input'
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard'
import { UseGuards } from '@nestjs/common'
import { AuthUser } from 'src/shared/decorators/user-decorate'
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

  @UseGuards(JwtAuthGuard)
  @Query(() => String)
  async test(@AuthUser() authUser: any) {
    console.log(authUser)
    return authUser
  }
}
