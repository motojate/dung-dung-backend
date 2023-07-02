import { UseGuards } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { AuthUser } from 'src/auth/user-decorate'
import { ScheduleService } from './schedule.service'
import { AuthUserInput } from 'src/auth/dto/auth-user.input'
import { Schedule } from './model/schedule.model'

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
  @Query(() => [Schedule])
  async createScheduleFromUser(@AuthUser() authUser: AuthUserInput, @Args('month') month: number): Promise<Schedule[]> {
    const userId = authUser.id
    return this.scheduleService.createScheduleFromUser(userId, month)
  }
}
