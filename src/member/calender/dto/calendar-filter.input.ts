import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CalendarFilterInput {
  @Field(() => [String])
  readonly months: string[]

  @Field(() => String, { nullable: true })
  readonly month?: string
}
