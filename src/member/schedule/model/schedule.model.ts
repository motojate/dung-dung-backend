import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Calendar } from 'src/member/calender/model/calendar.model'
import { User } from 'src/member/user/model/user.model'

@ObjectType()
export class Schedule {
  @Field(() => Int)
  readonly id: number

  @Field(() => String)
  readonly title: string

  @Field(() => Date)
  readonly day: Date

  @Field(() => Date)
  readonly startTime: Date

  @Field(() => Date)
  readonly endTime: Date

  @Field(() => [User], { nullable: true })
  readonly users?: User[]

  @Field(() => Calendar, { nullable: true })
  readonly calendar?: Calendar
}
