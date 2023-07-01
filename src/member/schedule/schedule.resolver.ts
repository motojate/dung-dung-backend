import { UseGuards } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { AuthUser } from 'src/auth/user-decorate'
import { ScheduleService } from './schedule.service'

@Resolver()
export class ScheduleResolver {
  constructor(private scheduleService: ScheduleService) {}
  @UseGuards(JwtAuthGuard)
  @Query(() => String)
  async findByScheduleFromUser(@AuthUser() authUser: any) {
    return this.scheduleService.findByScheduleFromUser(authUser)
  }
}
