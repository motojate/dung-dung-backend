import { Field, Int, ObjectType } from '@nestjs/graphql'
import { Schedule } from 'src/member/schedule/model/schedule.model'

@ObjectType()
export class User {
  @Field(() => Int)
  readonly id: number

  @Field(() => String)
  readonly userId: string

  @Field(() => String)
  readonly password: string

  @Field(() => [Schedule], { nullable: true })
  readonly schedules?: Schedule[]
}
