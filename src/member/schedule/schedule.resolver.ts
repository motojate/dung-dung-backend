import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { AuthUser } from 'src/auth/user-decorate'
import { ScheduleService } from './schedule.service'
import { AuthUserInput } from 'src/auth/dto/auth-user.input'
import { Schedule } from './model/schedule.model'
import { CreateScheduleInput } from './dto/shedule.input'

@Resolver()
export class ScheduleResolver {
  constructor(private scheduleService: ScheduleService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [Schedule])
  async findByScheduleFromUserAndMonth(@AuthUser() authUser: AuthUserInput, @Args('month') month: number): Promise<Schedule[]> {
    const userId = authUser.id
    return this.scheduleService.findByScheduleFromUserAndMonth(userId, month)
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Boolean)
  async createScheduleFromUser(@AuthUser() authUser: AuthUserInput, @Args('createScheduleInput') createScheduleInput: CreateScheduleInput): Promise<boolean> {
    createScheduleInput.userId = authUser.id
    return this.scheduleService.createScheduleFromUser(createScheduleInput)
  }
}
