import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Schedule } from 'src/member/schedule/model/schedule.model'

@ObjectType()
export class Calendar {
  @Field(() => Int)
  readonly id: number

  @Field(() => String)
  readonly month: string

  @Field(() => [Schedule], { nullable: true })
  readonly schedules?: Schedule[]
}
