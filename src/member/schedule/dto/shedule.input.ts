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

  @Field(() => Boolean, { defaultValue: false })
  readonly isSpecial: boolean

  @Field(() => Number, { nullable: true })
  userId?: number
}

@InputType()
export class FindScheduleFilter {
  @Field(() => Number)
  readonly userId: number

  @Field(() => Number)
  readonly month: number

  @Field(() => Boolean, { nullable: true })
  readonly isSpecial?: boolean
}
