import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateScheduleInput {
  @Field(() => Date)
  readonly startTime: Date

  @Field(() => Date)
  readonly endTime: Date

  @Field(() => String)
  readonly title: string

  @Field(() => Date)
  readonly day: Date

  @Field(() => Number)
  readonly month: number

  @Field(() => Number, { nullable: true })
  userId?: number
}
